// select ORIGIN_AIRPORT, AIRLINE, count(*)
// from flights
// where CANCELLED == '1'
// --and CANCELLATION_REASON is null
// and FULL_DATE between ISODate("2019-11-26T17:03:37.343+0000") and ISODate("2019-11-26T17:03:37.343+0000")
// group by ORIGIN_AIRPORT, AIRLINE
// order by ORIGIN_AIRPORT, AIRLINE, count(*) desc
// ;

const moment = require('moment');

const query2 = (dateFrom, dateTo) => {
    return [
        {
            "$match": {
                "CANCELLED": "1",
                "CANCELLATION_REASON" : null,
                "FULL_DATE": {
                    "$gte": moment(dateFrom).toDate(),
                    "$lte": moment(dateTo).toDate()
                }
            }
        },
        {
            "$group": {
                "_id": {
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
                "COUNT(*)": "$COUNT(*)",
                "_id": 0
            }
        },
        {
            "$sort": {
                "ORIGIN_AIRPORT": 1,
                "AIRLINE": 1,
                "COUNT(*)": -1
            }
        }
    ];
}

module.exports = {
    query2
}