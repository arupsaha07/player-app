import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig, ApiConfig } from '../config';

export class BaseApi {

    protected httpClient: HttpClient;
    protected url: string;

    constructor() {
        this.httpClient = AppConfig.InjectorInstance.get<HttpClient>(HttpClient);
    }

    protected authenticate(username: string, password: string) {
        const params = new HttpParams({ fromObject: { username: username, password: password } })
        // Note for text response error fix: { responseType: 'text' }
        return this.httpClient.post(this.url, params);
    }

    protected get() {
        return this.httpClient.get(this.url);
    }

    protected getByPage(pageNo: number = 0) {
        if (!pageNo) {
            return this.httpClient.get(this.url);
        }
        else {
            const params = new HttpParams({ fromString: 'pageNo=' + pageNo });
            return this.httpClient.get(this.url, { params: params });
        }
    }

    protected save(data: any) {
        const params = new HttpParams({ fromObject: data });
        return this.httpClient.post(this.url, params);
    }

    protected delete(id: number) {
        const params = new HttpParams({ fromString: 'id=' + id });
        return this.httpClient.post(this.url, params);
    }

    protected upload(file: Blob, folderName: string) {
        this.url = ApiConfig.getBaseUrl() + "/upload";
        const uploadData = new FormData();
        uploadData.append('image', file);
        uploadData.append('folderName', folderName);
        // Note for text response error fix: { responseType: 'text' }
        return this.httpClient.post(this.url, uploadData);
    }
}