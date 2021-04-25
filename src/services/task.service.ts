import { Injectable, Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(TasksService.name)

  // ====== Cron ======
  addCronJob(name: string, pattern: string, callback: () => void) {
    const job = new CronJob(pattern, () => {
      callback()
    })

    this.schedulerRegistry.addCronJob(name, job)
    job.start()

    this.logger.warn(`job ${name} added !`)
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name)
    this.logger.warn(`job ${name} deleted!`)
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach((value, key, map) => {
      let next
      try {
        next = value.nextDates().toDate()
      } catch (e) {
        next = 'error: next fire date is in the past!'
      }
      this.logger.log(`job: ${key} -> next: ${next}`)
    })
    return jobs
  }

  getCron(name: string) {
    return this.schedulerRegistry.getCronJob(name)
  }

  // ====== Interval ======
  addInterval(name: string, milliseconds: number, callback: () => void) {
    const interval = setInterval(callback, milliseconds)
    this.schedulerRegistry.addInterval(name, interval)
  }

  deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name)
    this.logger.warn(`Interval ${name} deleted!`)
  }

  getIntervals() {
    const intervals = this.schedulerRegistry.getIntervals()
    intervals.forEach(key => this.logger.log(`Interval: ${key}`))
    return intervals
  }

  getInteval(name: string) {
    return this.schedulerRegistry.getInterval(name)
  }

  // ====== Timeout ======

  addTimeout(name: string, milliseconds: number, callback: () => void) {
    const timeout = setTimeout(callback, milliseconds)
    this.schedulerRegistry.addTimeout(name, timeout)
  }

  deleteTimeout(name: string) {
    this.schedulerRegistry.deleteTimeout(name)
    this.logger.warn(`Timeout ${name} deleted!`)
  }

  getTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts()
    timeouts.forEach(key => this.logger.log(`Timeout: ${key}`))
    return timeouts
  }

  getTimeout(name: string) {
    return this.schedulerRegistry.getTimeout(name)
  }
}
