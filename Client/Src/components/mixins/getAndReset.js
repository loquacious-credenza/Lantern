'use strict';

export default function getAndReset(prop, val){
  let saved = this.state[prop];
  this.setState({ [prop]: val});
  return saved;
}
