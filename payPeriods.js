(function(undefined){

    // check for nodeJS
    var hasModule = (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined');
    var PayPeriods = {};
    var obj = PayPeriods;
    var global = this;

    function momentCheck() {
        if (!moment){
            throw new Error('MomentJS is required');
        }
    }

    obj.biweek = function(year, start){
        var dates = [], idx = 0, endDt, dt;
        momentCheck();
        dt = moment()
            .weekYear(year)
            .startOf('year')
            .day(0).add('day',start)
            .hour(0).minute(0).second(0);

        while (idx != 26) {
            endDt = dt.clone().add('week',2).subtract('day',1);
            endDt.hour(23).minute(59).second(59);
            dates.push({year: year,id: idx, startDate: dt.clone().toDate(), endDate: endDt.toDate()});
            dt.add('week',2);
            idx += 1;
        }
        return dates;
    };

    obj.week = function(year, start) {
        var startDt, endDt, weeks = [], idx = 0, endYear;
        momentCheck();

        startDt = moment().year(year).month(0)
            .date(0).day(start)
            .hour(0).minute(0).second(0);

        endDt = startDt.clone().add('d',6);
        endYear = year+1;
        while (endDt.year()  < endYear) {
            endDt.hour(23).minute(59).second(59);
            weeks.push({year: year,id: idx,startDate: startDt.clone().toDate(), endDate: endDt.clone().toDate()});

            startDt = endDt.clone().add('d',1);
            endDt = startDt.clone().add('d',6);
            idx+= 1;
        }
        return weeks;
    };

    obj.semimonth = function(year, start, end) {
        var endFn, startDt, startingDate, endDt = null, semiMonths = [], idx = 0;
        momentCheck();
        //Variable checks...
        //Start can't be greater than end, unless end is negative.  Start and end can't be both negative.  |start-end| has to be greater than or equal to 14
        if (start > end && end > -1 || start < 0 && end < 0 || Math.abs(start-end) < 14) {
            return [];
        }

        start = (start < 1) ? start + 1 : start;

        endFn = function(){
            return end-1;
        }
        if (end < 0) {
            endFn = function(date){
                return date.clone().endOf('month').date();
            }
        }

        startDt = moment().year(year).month(0)
            .date(start)
            .hour(0).minute(0).second(0);
        startingDate = startDt.clone().add('year',1).subtract('day',1);

        while (startDt.isBefore(startingDate) && !startDt.isSame(startingDate) && idx < 100) {
            endDt.hour(23).minute(59).second(59);
            endDt = startDt.clone().date(endFn(startDt));
            //if the End Date is before the Start Dt
            if (endDt.isBefore(startDt)) {
                endDt = endDt.add('M',1);
            }
            semiMonths.push({id: idx,startDate: startDt.clone().toDate(), endDate: endDt.clone().toDate()});

            idx+= 1;

            startDt = endDt.clone().add('d',1);
            startDt.hour(0).minute(0).second(0);

            endDt = startDt.clone().date(start);
            //if the End Date is before the Start Dt
            if (endDt.isBefore(startDt)) {
                endDt = endDt.add('M',1);
            }

            endDt.subtract('d',1);
            endDt.hour(23).minute(59).second(59);

            semiMonths.push({year: year,id: idx,startDate: startDt.clone().toDate(), endDate: endDt.clone().toDate()});

            startDt = endDt.clone().add('d',1);
            startDt.hour(0).minute(0).second(0);
            idx+= 1;
        }
        return semiMonths;
    };

    obj.month = function(year, start){        
        var startDt, endDt, months = [], idx = 0, endYear;
        momentCheck();

        startDt = moment().year(year).month(0)
            .hour(0).minute(0).second(0);
        start = (start < 1) ? start + 1 : start;
        startDt.date(start);
        endDt = startDt.clone().add('days',startDt.daysInMonth()).subtract('days',1);

        endYear = year+1;
        while (startDt.year()  < endYear) {
            endDt.hour(23).minute(59).second(59);
            months.push({year: year,id: idx,startDate: startDt.clone().toDate(), endDate: endDt.clone().toDate()});

            startDt = startDt.clone().add('M',1);
            endDt = endDt.clone().add("M",1);
            idx+= 1;
        }
        return months;
    };

    function makeGlobal() {
        global['payPeriods'] = PayPeriods;  
    }

    if (hasModule) {
        module.exports = PayPeriods;
        makeGlobal();
    } else if (typeof define === "function" && define.amd) {
        define("payPeriods", function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal !== true) {
                // If user provided noGlobal, he is aware of global
                makeGlobal();
            }

            return PayPeriods;
        });
    } else {
        makeGlobal();
    }

})();