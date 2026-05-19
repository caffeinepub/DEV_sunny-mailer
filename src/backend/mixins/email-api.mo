import Types "../types/email";
import EmailLib "../lib/email";

mixin () {
  public func sendEmail(to : Text, subject : Text, body : Text) : async Types.SendEmailResult {
    await EmailLib.sendEmail(to, subject, body);
  };
};
