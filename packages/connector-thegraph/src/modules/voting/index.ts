import * as queries from './queries'
import * as parsers from './parsers';
import { Module } from '../../types';

const coreModule: Module = {
  selectors: {
    votesForApp: {
      query: queries.ALL_VOTES,
      parser: parsers.parseVotes
    },

    castsForVote: {
      query: queries.CASTS_FOR_VOTE,
      parser: parsers.parseCasts
    }
  }
}

export default coreModule