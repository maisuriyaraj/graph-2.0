import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    userName: { type: String, default: '' }, // Default value to avoid null
    password: { type: String, select: false },
    googleAccount: { type: Boolean, default: false },
    githubAccount: { type: Boolean, default: false },
    phone_number: { type: String, default: null },
    designation:{type:String,default:null},
    profile_picture: { type: String, default: null },
    background_cover: { type: String, default: null },
    company_name: { type: String, default: null },
    job_description: { type: String, default: null },
    languages: { type: [String], default: [] },
    bio: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    AIbotChats:{type:Array,default:[]}
}, { timestamps: true });

export const userModel = mongoose.models.users || mongoose.model('users', userSchema);


const AuthTableSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    device_token: { type: String, default: null },
    fcm_token: { type: String, default: null },
    isExpired: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    access_token: { type: String }
})

export const AuthTableModel = mongoose.models.Tokens || mongoose.model('Tokens', AuthTableSchema);

const jobListingSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    job_description: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    application_link: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
    },
});

export const jobListingModel = mongoose.models.jobLists || mongoose.model('jobLists', jobListingSchema);


const jobPortalsSchema = new mongoose.Schema({
    name: { type: String },
    url: { type: String },
    features: { type: [String] },
    logo_url: { type: String }
});

export const jobPortals = mongoose.models.jobPortals || mongoose.model('jobPortals', jobPortalsSchema);


const communitySchema = new mongoose.Schema({
    community_name: {
        type: String,
        required: true
    },
    total_users: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: true
    },
    background_picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export const communityModel = mongoose.models.communities ||  mongoose.model('communities',communitySchema);

const calenderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    calenderName:{type:String,    enum: ['google', 'outlook'],default:'google' },
    accountConnected:{type:Boolean,default:false},
    access_token: {type:String,required:true},
    refresh_token:{type:String},
    scope: {type:String},
    token_type:{type:String},
    expiry_date: {type:Number ,default:null}
});

export const calenderModel = mongoose.models.calender ||  mongoose.model('calender',calenderSchema);


const chatSchema = new mongoose.Schema({
    userMessage:{type:String},
    AiReply:{type:String}
});

const AIBotSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    chatTitle:{type:String,default:""},
    chats:[chatSchema]

},{ timestamps: true });

export const AIBotModel = mongoose.models.aichats || mongoose.model('aichats',AIBotSchema);