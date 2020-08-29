// select AIRLINE, count(*), max(DEPARTURE_DELAY), avg(DEPARTURE_DELAY), min(DEPARTURE_DELAY)
// from flights
// where DEPARTURE_DELAY is not null
// and FULL_DATE between ISODate("2019-11-26T17:03:37.343+0000") and ISODate("2019-11-26T17:03:37.343+0000")
// group by AIRLINE
// order by count(*)
// ;
const moment = require('moment');

const query1 = (dateFrom, dateTo) => {
    return [
        {
            "$match": {
                "DEPARTURE_DELAY": {
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
                    "AIRLINE": "$AIRLINE"
                },
                "COUNT(*)": {
                    "$sum": 1
                },
                "MAX(DEPARTURE_DELAY)": {
                    "$max": "$DEPARTURE_DELAY"
                },
                "AVG(DEPARTURE_DELAY)": {
                    "$avg": "$DEPARTURE_DELAY"
                },
                "MIN(DEPARTURE_DELAY)": {
                    "$min": "$DEPARTURE_DELAY"
                }
            }
        },
        {
            "$project": {
                "AIRLINE": "$_id.AIRLINE",
                "COUNT(*)": "$COUNT(*)",
                "MAX(DEPARTURE_DELAY)": "$MAX(DEPARTURE_DELAY)",
                "AVG(DEPARTURE_DELAY)": "$AVG(DEPARTURE_DELAY)",
                "MIN(DEPARTURE_DELAY)": "$MIN(DEPARTURE_DELAY)",
                "_id": 0
            }
        },
        {
            "$sort": {
                "COUNT(*)": 1
            }
        }
    ];
}

module.exports = {
    query1
}