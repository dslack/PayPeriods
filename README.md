Simple Pay Period generating JS Library

## Usage

### Week:
	
	PayPeriods.week(year,dayOfWeek);

 The dayOfWeek is simply the day of the week (0-6) of the first week of the year.
 So, a dayOfWeek of 0, is the Sunday of the first week of January. If the week starts on Monday for a division, we would simply specify '1'

---

### Bi-Week:

 	PayPeriods.biweek(year, dayOffset);

 The dayOffset lets us offset when the first biweekly pay period starts.
 First, the starting date set to be the Sunday of the first week of the year.  By setting a negative value, we can move backwards if the region dictates it.
 So, running PayPeriods.biweek(2013,-7) would have the first biweek of Dec. 23, 2012 to Jan. 5, 2013.

---

### Semi-Monthly:

 	PayPeriods.semimonth(year, start1, start2);

 The start1and start2 indicate the starting days of the two pay periods.
 There are several use cases for this method.
 1) start1 and start2 are both +ve (1 & 15, 2 & 16, etc).
 2) start1 is -ve and start2 is +ve (-1 & 14, -5 & 10)
 3) start1 is +ve and start2 is -ve (15 & -1, 16 & -2)

 When a value is -ve, it means we are going in to the end of the previous month.  So, when start1 is -ve, the first pay period will actually start in December. While when start2 is -ve, we are going to go to the end of the month, then back the amount of days indicated.

 This is useful when a pay period is on the 15 and the "31st" - since the 31st isn't actually valid for all months, we can simply indicate -1, and our utility will go to the last day of the month (-2 would the second last day, etc).

 NOTE: 0 for a start date is the same as a 1, and the end CANNOT be 0

---

### Month:

 	PayPeriods.month(year, start);

 The start indicates the starting day of the month (0 and 1 mean the same thing).  -ve values are allowed.

 So, for a pay period that always is from 1st to the end of the month, its simply:

 PayPeriods.month(2013,1);

 If it needs to go from the 31st of December, onwards, simply do:

 PayPeriods.month(2013,-1);
