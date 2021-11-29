const express = require('express');
const mongoose = require('mongoose');


const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/job", {

    });
};
// company Schema 

const companySchema = new mongoose.Schema({
    company_name: { type: "String", required: true },
    established_year: { type: "Date", required: true },
    total_employees: { type: "Number", required: true },
}, {
    versionKey: false,
    timestamps: true,
});

const Company = mongoose.model('company', companySchema);

// Skill Schema 

const skillSchema = new mongoose.Schema({
    tech_skill: { type: "String", required: true },
    soft_skill: { type: "String", required: true },
}, {
    versionKey: false,
    timestamps: true,
});

const Skill = mongoose.model('skill', skillSchema);

//post Schema 

const job_postSchema = new mongoose.Schema({
    total_opening: { type: "Number", required: true },
    job_type: { type: "String", required: true },
    rating: { type: "Number", required: true },
    location: { type: "String", required: true },
    notice_period:{ type: "String", required: false,default: "1 Month"},

    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true,

    },
    skill_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "skill",
            required: true,
        },
    ],

}, {
    versionKey: false,
    timestamps: true,
});

const Job_post = mongoose.model("job_post", job_postSchema);

const app = express();
app.use(express.json());


// skills crud
app.post("/skills", async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        return res.status(201).send({ skill })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

app.get("/skills", async (req, res) => {
    try {
        const skills = await Skill.find().lean().exec();
        return res.status(201).send({ skills })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});


//Company Crud
app.post("/companies", async (req, res) => {
    try {
        const company = await Company.create(req.body);
        return res.status(201).send({ company })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

app.get("/companies", async (req, res) => {
    try {
        const companies = await Company.find().lean().exec();
        return res.status(201).send({ companies })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

//Job Posting Crud

app.post("/job_posts", async (req, res) => {
    try {
        const job_post = await Job_post.create(req.body);
        return res.status(201).send({ job_post });
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

// sort by Rating
app.get("/job_posts", async (req, res) => {
    try {
        const job_posts = await Job_post.find().sort({"rating":1})
            .populate({ path: "company_id", select: "company_name" })
            .populate({ path: "skill_ids", select: "skill_name" })
            .lean()
            .exec();
        return res.status(201).send({ job_posts })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

app.get("/job_posts", async (req, res) => {
    try {
        const job_posts = await Job_post.find()
            .populate({ path: "company_id", select: "company_name" })
            .populate({ path: "skill_ids", select: "skill_name" })
            .lean()
            .exec();
        return res.status(201).send({ job_posts })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

// find by City 

app.get("/job_posts/:id", async (req, res) => {
    try {
        const job_posts = await Job_post.findById(req.params.id)
            .populate({ path: "company_id", select: "company_name" })
            .populate({ path: "skill_ids", select: "skill_name" })
            .lean()
            .exec();
        return res.status(201).send({ job_posts })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

//find by Job Type 
app.get("/job_posts/:id", async (req, res) => {
    try {
        const job_posts = await Job_post.findById(req.params.id)
            .populate({ path: "company_id", select: "company_name" })
            .populate({ path: "skill_ids", select: "skill_name" })
            .lean()
            .exec();
        return res.status(201).send({ job_posts })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

//find by Job Type
app.get("/job_posts/:id", async (req, res) => {
    try {
        const job_posts = await Job_post.findById(req.body)
            .populate({ path: "company_id", select: "company_name" })
            .populate({ path: "skill_ids", select: "skill_name" })
            .lean()
            .exec();
        return res.status(201).send({ job_posts })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

//find Company Details

app.get("/companies/:id", async (req, res) => {
    try {
        const companies = await Company.findById(req.params.id).lean().exec();
        return res.status(201).send({ companies })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});

//company with most opening
app.get("/job_posts", async (req, res) => {
    try {
        const job_posts = await Job_post.find({"total_opening":Math.max(total_opening, 0)}).json()
            .populate({ path: "company_id", select: "company_name" })
            .populate({ path: "skill_ids", select: "skill_name" })
            .lean()
            .exec();
        return res.status(201).send({ job_posts })
    }
    catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

});



app.listen(4500, async (req, res) => {
    await connect();
    console.log("listening on port 4500");
});