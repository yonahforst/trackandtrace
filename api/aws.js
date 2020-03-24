import Amplify, { 
  Auth,
  Storage,
} from "aws-amplify";
import config from '../aws-exports'
import cuid from 'cuid'
Amplify.configure(config)
Storage.configure({ 
  // level: 'private',
  customPrefix: {
    public: 'uploads/'
  }
});

export const uploadReportToS3 = async (payload) => {
  const id = cuid()
  
  await Storage.put(id + '.json', JSON.stringify(payload, null, 2), {
    contentType: 'application/json',

})
}