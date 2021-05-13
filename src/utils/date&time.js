/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { DateTime } from 'luxon';

export const getDatesDifference = (startDate, endDate) => {
    const start = DateTime.fromISO(startDate);
    const end = DateTime.fromISO(endDate);
    const diff = end.diff(start, [ 'minutes' ]).toObject();

    return diff;
}

export const getFormattedDate = (date) => {
    const luxDate = DateTime.fromISO(date);
    return luxDate.setLocale('co').toLocaleString(DateTime.DATE_FULL);
}

export const getDateBoundaries = (date) => {
    const luxDate = DateTime.fromISO(date);
    const startDate = luxDate.startOf('month').toISODate();
    const endDate = luxDate.endOf('month').toISODate();
    
    return { startDate, endDate };
}