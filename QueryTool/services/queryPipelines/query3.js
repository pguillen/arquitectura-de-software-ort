// select ORIGIN_AIRPORT, AIRLINE, CANCELLATION_REASON, count(*)
// from flights
// where CANCELLED == '1'
// and CANCELLATION_REASON is not null
// and FULL_DATE between ISODate("2019-11-26T17:03:37.343+0000") and ISODate("2019-11-26T17:03:37.343+0000")
// group by ORIGIN_AIRPORT, AIRLINE, CANCELLATION_REASON
// order by ORIGIN_AIRPORT desc, AIRLINE, CANCELLATION_REASON, count(*) desc
// ;
const moment = require('moment');

const query3 = (dateFrom, dateTo) => {
    return [
        {
            "$match": {
                "CANCELLED": "1",
                "CANCELLATION_REASON": {
                    "$ne": null
                },
                "FULL_DATE": {
                    "$gte": moment(dateFrom).toDate(),
                    "$lte": moment(dateTo).toDate()
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "CANCELLATION_REASON": "$CANCELLATION_REASON",
                    "ORIGIN_AIRPORT": "$ORIGIN_AIRPORT",
                    "AIRLINE": "$AIRLINE"
                },
                "COUNT(*)": {
                    "$sum": 1
                }
            }
        },
        {
            "$project": {
                "ORIGIN_AIRPORT": "$_id.ORIGIN_AIRPORT",
                "AIRLINE": "$_id.AIRLINE",
                "CANCELLATION_REASON": "$_id.CANCELLATION_REASON",
                "COUNT(*)": "$COUNT(*)",
                "_id": 0
            }
        },
        {
            "$sort": {
                "ORIGIN_AIRPORT": -1,
                "AIRLINE": 1,
                "CANCELLATION_REASON": 1,
                "COUNT(*)": -1
            }
        }
    ];
}

module.exports = {
    query3
}