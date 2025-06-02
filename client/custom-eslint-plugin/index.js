const noFormActionProp = require('./rules/no-form-action-prop.js') // eslint-disable-line
const noButtonFormActionProp = require('./rules/no-button-form-action-prop.js') // eslint-disable-line

module.exports = {
  rules: {
    'no-form-action-prop': noFormActionProp,
    'no-button-form-action-prop': noButtonFormActionProp
  }
}
