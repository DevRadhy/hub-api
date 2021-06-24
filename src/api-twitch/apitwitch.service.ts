import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ApitwitchService {
  constructor(private httpService: HttpService) {}
  public getUserId(id: string) {
    return this.getId(id);

    // return id;
  }

  public async getPhoto(id: string) {
    const response = await this.getId(id);

    return response.logo;
  }

  private async getId(name: string) {
    const headersRequest = {
      'Client-ID': 'tjs9gqghzdfuuycllhiq8erjp4mdk9',
      'Accept': 'application/vnd.twitchtv.v5+json',
    };

    const url = `https://api.twitch.tv/kraken/users?login=${name}`;
    try {
      const response = await this.httpService
        .get(url, { headers: headersRequest })
        .toPromise();
      return response.data.users[0];
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
