import AxiosClient from './AxiosClint';
import { branches } from '../../../backend/data/branches';
import relationOfLocationAndBranch from '../../../backend/data/relationOfLocationAndBranch';
import { AxiosPromise } from 'axios';

class Service extends AxiosClient {
  constructor(baseURL: string) {
    super(baseURL);
  }

  authenticate(data: TAuth): Promise<TSuccess<TAuthenticate>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post('/authenticate', data)
        .then(({ data }) => {
          resolve({
            success: true,
            message: 'Successfully logged in!',
            code: 201,
            data: {
              user: {
                userId: '1',
                FastName: 'Farhan',
                LastName: 'Galib',
                email: 'farhan.galib@gmail.com',
                phone: '+88011212121',
                address: 'banani, dhaka',
              },
              accessToken: 'lskdfncsdhfwj123nfklndf',
              expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            },
          });
        })
        .catch(reject);
    });
  }

  getLocations(): AxiosPromise<TSuccess<TLocations>> {
    return this.axios.get('/locations');
  }

  getBranches(params: {
    branchesId: string[];
  }): AxiosPromise<TSuccess<TBranches>> {
    console.log('Params = ', params);

    return this.axios.get('/branches', { params });
  }

  getBranch(id: TId): AxiosPromise<TSuccess<TBranch>> {
    return this.axios.get(`branch/${id}`);
  }

  getFoodItems(categoryId: string): AxiosPromise<TSuccess<TFoodItem[]>> {
    return this.axios.get('/food-items', {
      params: { categoryId: categoryId },
    });
  }

  getFoodCategories(): AxiosPromise<TSuccess<TFoodCategory[]>> {
    return this.axios.get('/food-categories');
  }
}

const service = new Service(process.env.REACT_APP_BASE_URL!);

export default service;
