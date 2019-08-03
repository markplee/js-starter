export const schema = {
  type: "object",
  properties: {
    users: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "#/definitions/positiveInt"
          },
          firstName: {
            type: "string",
            faker: "name.firstName"
          },
          lastName: {
            type: "string",
            faker: "name.lastName"
          },
          image: {
            type: "string",
            faker: "image.nature"
          },
          email: {
            type: "string",
            faker: "internet.email"
          }
        },
        required: ["id", "firstName", "lastName", "image", "email"]
      }
    }
  },
  required: ["users"],
  definitions: {
    positiveInt: {
      type: "integer",
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};
