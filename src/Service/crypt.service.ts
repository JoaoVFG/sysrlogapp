import { Injectable } from "@angular/core";
import { mapConfigService } from '../Service/mapconfig.service'
import { AES } from 'crypto-js'; // For AES encryption/decryption
import { enc } from 'crypto-js'; // For characters encodages types (Utf-8, latin1...)

@Injectable()
export class cryptService{

	secret = 'AUISHD98jpiOSHFP9W8R@981QW!JD-9io%afpoIUan'
	public cryptValue : string;
	constructor(private mapConfig: mapConfigService){
	}

	encrypt(dataToEncrypt : string) : string{

		
		let encrypted = AES.encrypt(dataToEncrypt,  this.secret);
		return encrypted.toString();
	}

	decrypt(dataToDecrypt : string) : string{

		let bytes  = AES.decrypt(dataToDecrypt,  this.secret);
		let decrypted = bytes.toString(enc.Utf8);
		return decrypted;
	}



}