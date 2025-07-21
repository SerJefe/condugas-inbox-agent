import cron from 'node-cron';
import 'dotenv/config';
import { sendDigest } from './utils/priority.js';

cron.schedule('30 12 * * *', () => sendDigest('daily'), { timezone: process.env.TIMEZONE });
cron.schedule('0 20 * * 5', () => sendDigest('weekly'), { timezone: process.env.TIMEZONE });
