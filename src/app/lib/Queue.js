import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name);
  }
}

// import RegistrationMail from '../jobs/RegistrationMail';

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// mailQueue.on('failed', (job) => {
//   console.log('Job failed', job.name, job.data);
// })

// export default mailQueue;