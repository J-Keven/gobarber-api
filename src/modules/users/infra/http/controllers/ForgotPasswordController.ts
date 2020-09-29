import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendPasswordRecoveryEmailService from '@modules/users/services/SendPasswordRecoveryEmailService';

class SendPasswordRecoveryEmail {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendPasswordRecoveryEmailService = container.resolve(
      SendPasswordRecoveryEmailService,
    );

    await sendPasswordRecoveryEmailService.execute({ email });
    return res.status(204).json();
  }
}

export default SendPasswordRecoveryEmail;
