import Types "../types/email";
import EmailClient "mo:caffeineai-email/emailClient";

module {
  public func sendEmail(to : Text, subject : Text, body : Text) : async Types.SendEmailResult {
    let htmlBody = "<html><body><p>" # body # "</p></body></html>";
    let result = await EmailClient.sendServiceEmail(
      "no-reply",
      [to],
      subject,
      htmlBody,
    );
    switch (result) {
      case (#ok) { #ok };
      case (#err(error)) { #err(error) };
    };
  };
};
