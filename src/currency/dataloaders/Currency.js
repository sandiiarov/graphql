// @flow

import Dataloader from 'dataloader';

import { getCurrencies } from '../api';

async function batchLoad(ids) {
  const data = await getCurrencies();

  return ids.map(id => data[id]);
}

function createLoader() {
  return new Dataloader(batchLoad);
}

export default createLoader;
