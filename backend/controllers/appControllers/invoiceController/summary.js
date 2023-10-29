const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('Invoice');

const summary = async (req, res) => {
  try {
    let defaultType = 'month';

    const { type } = req.query;

    if (type) {
      if (['week', 'month', 'year'].includes(type)) {
        defaultType = type;
      } else {
        return res.status(400).json({
          success: false,
          result: null,
          message: 'Invalid type',
        });
      }
    }

    const currentDate = moment();
    let startDate = currentDate.clone().startOf(defaultType);
    let endDate = currentDate.clone().endOf(defaultType);

    const statuses = ['borrador', 'pendiente', 'vencido', 'pagado', 'impago', 'parcial'];

    const response = await Model.aggregate([
      {
        $match: {
          removed: false,
          date: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $facet: {
          totalInvoice: [
            {
              $group: {
                _id: null,
                total: {
                  $sum: '$total',
                },
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                total: '$total',
                count: '$count',
              },
            },
          ],
          statusCounts: [
            {
              $group: {
                _id: '$status',
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                status: '$_id',
                count: '$count',
              },
            },
          ],
          paymentStatusCounts: [
            {
              $group: {
                _id: '$paymentStatus',
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                status: '$_id',
                count: '$count',
              },
            },
          ],
          expiredCounts: [
            {
              $match: {
                expiredDate: {
                  $lt: new Date(),
                },
              },
            },
            {
              $group: {
                _id: '$status',
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                status: '$_id',
                count: '$count',
              },
            },
          ],
        },
      },
    ]);

    let result = [];

    const totalInvoices = response[0].totalInvoice ? response[0].totalInvoice[0] : 0;
    const statusResult = response[0].statusCounts || [];
    const paymentStatusResult = response[0].paymentStatusCounts || [];
    const expiredResult = response[0].vencidoCounts || [];

    const statusResultMap = statusResult.map((item) => {
      return {
        ...item,
        percentage: Math.round((item.count / totalInvoices.count) * 100),
      };
    });

    const paymentStatusResultMap = paymentStatusResult.map((item) => {
      return {
        ...item,
        percentage: Math.round((item.count / totalInvoices.count) * 100),
      };
    });

    const expiredResultMap = expiredResult.map((item) => {
      return {
        ...item,
        status: 'vencido',
        percentage: Math.round((item.count / totalInvoices.count) * 100),
      };
    });

    statuses.forEach((status) => {
      const found = [...paymentStatusResultMap, ...statusResultMap, ...expiredResultMap].find(
        (item) => item.status === status
      );
      if (found) {
        result.push(found);
      }
    });

    const impago = await Model.aggregate([
      {
        $match: {
          removed: false,
          date: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
          paymentStatus: 'impago',
        },
      },
      {
        $group: {
          _id: null,
          total_amount: {
            $sum: '$total',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total_amount: '$total_amount',
        },
      },
    ]);

    const finalResult = {
      total: totalInvoices?.total.toFixed(2),
      total_undue: impago.length > 0 ? impago[0].total_amount.toFixed(2) : 0,
      type,
      performance: result,
    };

    return res.status(200).json({
      success: true,
      result: finalResult,
      message: `Successfully found all invoices for the last ${defaultType}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Oops there is an Error',
      error: error,
    });
  }
};

module.exports = summary;
