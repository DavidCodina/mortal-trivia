module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Prefer a form's onSubmit or button's onClick.",
      category: 'Best Practices',
      recommended: false
    },

    schema: [],
    messages: {
      avoidButtonFormAction:
        "Avoid using the formAction prop on buttons. Prefer actions called from form's onSubmit or button's onClick instead."
    }
  },

  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name &&
          node.name.type === 'JSXIdentifier' &&
          node.name.name === 'formAction'
        ) {
          const parent = node.parent
          if (
            parent &&
            parent.type === 'JSXOpeningElement' &&
            parent.name &&
            parent.name.type === 'JSXIdentifier'
          ) {
            const elementName = parent.name.name
            // Check for <button>, <Button>, or anything that includes 'Button'
            if (
              elementName === 'button' ||
              (elementName[0] === elementName[0].toUpperCase() &&
                elementName.includes('Button'))
            ) {
              context.report({
                node,
                messageId: 'avoidButtonFormAction'
              })
            }
          }
        }
      }
    }
  }
}
