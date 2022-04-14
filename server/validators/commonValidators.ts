import * as yup from "yup";
import { isValidObjectId } from "mongoose";

class ObjectIdSchema extends yup.MixedSchema {
  constructor() {
    super();

    this.withMutation((schema: this): void => {
      schema.transform((value) => {
        if (this.isType(value)) return value;
        return schema.typeError;
      });
    });
  }

  _typeCheck(_value: any): _value is any {
    return isValidObjectId(_value);
  }
}

export const mongoId = new ObjectIdSchema();

export const adminIdSchema = yup.object().shape({
  adminId: mongoId.typeError("Admin Id is not valid"),
});
