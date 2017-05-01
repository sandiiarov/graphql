// @flow

import chalkNode from 'chalk';

let chalk = chalkNode;
function forceColorSupport(enabled: boolean = true) {
  chalk = new chalkNode.constructor({ enabled });
}

function formatMessage(message: string | Object): string | Object {
  let newMessage = message;
  if (message instanceof Error) {
    newMessage = message.message;
  } else if (typeof message === 'object') {
    newMessage = JSON.stringify(message, null, 2);
  }
  return newMessage.replace(/\n/g, '\n   ');
}

const info = (message: string | Object): void => {
  console.log(chalk.blue(' i ') + formatMessage(message)); // eslint-disable-line no-console
};

const warning = (message: string | Object): void => {
  console.warn(chalk.yellow(' w ') + formatMessage(message)); // eslint-disable-line no-console
};

const error = (message: string | Object): void => {
  console.error(chalk.red.bold(' E ') + formatMessage(message)); // eslint-disable-line no-console
};

export default {
  info,
  warning,
  error,
  forceColorSupport,
};
