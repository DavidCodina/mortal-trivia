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
      avoidFormAction:
        "Avoid using the action prop on forms. Prefer actions called from form's onSubmit or button's onClick instead."
    }
  },

  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name &&
          node.name.type === 'JSXIdentifier' &&
          node.name.name === 'action'
        ) {
          const parent = node.parent
          if (
            parent &&
            parent.type === 'JSXOpeningElement' &&
            parent.name &&
            parent.name.type === 'JSXIdentifier'
          ) {
            const elementName = parent.name.name
            // Check for <form>, <Form>, or anything that includes 'Form'
            if (
              elementName === 'form' ||
              (elementName[0] === elementName[0].toUpperCase() &&
                elementName.includes('Form'))
            ) {
              context.report({
                node,
                messageId: 'avoidFormAction'
              })
            }
          }
        }
      }
    }
  }
}
