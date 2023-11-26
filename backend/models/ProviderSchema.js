import mongoose from "mongoose";

// Create schema for providers
const ProviderSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  personal_info: {
      first_name: {
          type: String,
          required: true
      },
      last_name: {
          type: String,
          required: true
      },
      organization: {
          type: String,
          required: false
      }
  },
  jobs_uploaded: [{
    _id: {
          type: String,
          required: true
      },
    completed: {
          type: Boolean,
          required: true
      }
  }, {timestamps: true}]
});

// Create model for providers
const Providers = mongoose.model('Providers', ProviderSchema);
export default Providers;