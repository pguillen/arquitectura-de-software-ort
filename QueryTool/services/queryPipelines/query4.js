// select AIRLINE, count(*)
// from flights
// where DIVERTED == '1'
// and FULL_DATE between ISODate("2019-11-26T17:03:37.343+0000") and ISODate("2019-11-26T17:03:37.343+0000")
// group by AIRLINE
// order by count(*) desc
// ;
const moment = require('moment');

const query4 = (dateFrom, dateTo) => {
    return [
        {
            "$match": {
                "DIVERTED": "1",
                "FULL_DATE": {
                    "$gte": moment(dateFrom).toDate(),
                    "$lte": moment(dateTo).toDate()
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "AIRLINE": "$AIRLINE"
                },
                "COUNT(*)": {
                    "$sum": 1
                }
            }
        },
        {
            "$project": {
                "AIRLINE": "$_id.AIRLINE",
                "COUNT(*)": "$COUNT(*)",
                "_id": 0
            }
        },
        {
            "$sort": {
                "COUNT(*)": -1
            }
        }
    ];
}

module.exports = {
    query4
}
