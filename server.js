const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Sample Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my API" });
});

// Example CRUD API for Users
let users = [
    {
      "id":1,
      "name": "Dr. John Doe",
      "experience": "10 years",
      "degree": "MBBS, MD (Cardiology)",
      "hospitalName": "City Heart Hospital",
      "address": "123 Main St, New York, NY",
      "prices": "$200",
      "city": "New York",
      "img": "doctor_john_doe.jpg",
      "overview": "Dr. Doe is a seasoned cardiologist specializing in diagnosing and treating various heart conditions. He focuses on preventive cardiology and patient education.",
      "experience": "10 years of experience in interventional cardiology and cardiac care.",
      "treatments": ["Angioplasty", "Stent Placement", "Echocardiography", "ECG"],
      "conditions": ["Coronary Artery Disease", "Heart Failure", "Arrhythmias"]
    },
    {
      "id":2,
      "name": "Dr. Jane Smith",
      "experience": "15 years",
      "degree": "MBBS, MS (Dermatology)",
      "hospitalName": "General Hospital",
      "address": "456 Oak Ave, Los Angeles, CA",
      "prices": "$250",
      "city": "Los Angeles",
      "img": "doctor_jane_smith.jpg",
      "overview": "Dr. Smith is a highly experienced dermatologist specializing in medical, surgical, and cosmetic dermatology. She is dedicated to providing personalized care.",
      "experience": "15 years specializing in skin cancer, acne, and cosmetic procedures.",
      "treatments": ["Chemical Peels", "Laser Treatments", "Biopsies", "Acne Therapy"],
      "conditions": ["Eczema", "Psoriasis", "Skin Cancer", "Acne"]
    },
    {
      "id":3,
      "name": "Dr. David Lee",
      "experience": "8 years",
      "degree": "MBBS, DM (Pediatrics)",
      "hospitalName": "Specialty Clinic",
      "address": "789 Pine Ln, Houston, TX",
      "prices": "$180",
      "city": "Houston",
      "img": "doctor_david_lee.jpg",
      "overview": "Dr. Lee is a dedicated pediatrician committed to providing comprehensive care for children of all ages. He focuses on preventive care and child development.",
      "experience": "8 years of experience in general pediatrics and developmental pediatrics.",
      "treatments": ["Vaccinations", "Well-Child Checkups", "Developmental Assessments", "Acute Illness Care"],
      "conditions": ["Asthma", "Allergies", "Infections", "Developmental Delays"]
    },
    {
      "id":4,
      "name": "Dr. Sarah Jones",
      "experience": "12 years",
      "degree": "MBBS, DNB (Orthopedic Surgery)",
      "hospitalName": "County Medical Center",
      "address": "1011 Elm Rd, Miami, FL",
      "prices": "$220",
      "city": "Miami",
      "img": "doctor_sarah_jones.jpg",
      "overview": "Dr. Jones is an orthopedic surgeon specializing in treating musculoskeletal injuries and conditions. She is skilled in both surgical and non-surgical treatments.",
      "experience": "12 years specializing in sports injuries, joint replacements, and fracture care.",
      "treatments": ["Joint Replacement Surgery", "Arthroscopy", "Fracture Repair", "Physical Therapy"],
      "conditions": ["Arthritis", "Sports Injuries", "Fractures", "Spinal Disorders"]
    },
    {
      "id":5,
      "name": "Dr. Michael Brown",
      "experience": "20 years",
      "degree": "MBBS, FRCS (Neurosurgery)",
      "hospitalName": "University Hospital",
      "address": "1213 Birch St, Chicago, IL",
      "prices": "$300",
      "city": "Chicago",
      "img": "doctor_michael_brown.jpg",
      "overview": "Dr. Brown is a highly experienced neurosurgeon specializing in complex brain and spine surgeries. He is known for his expertise and compassionate care.",
      "experience": "20 years in complex brain tumor removal, spinal surgery, and trauma care.",
      "treatments": ["Brain Tumor Surgery", "Spinal Fusion", "Craniotomy", "Neurological Monitoring"],
      "conditions": ["Brain Tumors", "Spinal Cord Injuries", "Stroke", "Epilepsy"]
    },
      
    { "id":6,
      "name": "Dr. Emily Wilson",
      "experience": "7 years",
      "degree": "MBBS, MRCP (Gastroenterology)",
      "hospitalName": "Community Clinic",
      "address": "1415 Maple Dr, Philadelphia, PA",
      "prices": "$150",
      "city": "Philadelphia",
      "img": "doctor_emily_wilson.jpg",
      "overview": "Dr. Wilson specializes in digestive system disorders. She focuses on providing accurate diagnoses and effective treatment plans.",
      "experience": "7 years specializing in endoscopy, colonoscopy, and managing digestive diseases.",
      "treatments": ["Endoscopy", "Colonoscopy", "Liver Biopsy", "Inflammatory Bowel Disease Management"],
      "conditions": ["IBD", "GERD", "Liver Disease", "Pancreatitis"]
    },
    {
      "id":7,
      "name": "Dr. Robert Garcia",
      "experience": "18 years",
      "degree": "MBBS, FRCSEd (Obstetrics and Gynecology)",
      "hospitalName": "Regional Medical Center",
      "address": "1617 Cedar Ct, Columbus, OH",
      "prices": "$280",
      "city": "Columbus",
      "img": "doctor_robert_garcia.jpg",
      "overview": "Dr. Garcia is an experienced OB/GYN specializing in women's health. He provides comprehensive care for pregnancy, childbirth, and gynecological conditions.",
      "experience": "18 years specializing in high-risk pregnancies, gynecological surgeries, and fertility treatments.",
      "treatments": ["Prenatal Care", "Delivery", "Hysterectomy", "Fertility Treatments"],
      "conditions": ["Pregnancy Complications", "Endometriosis", "Fibroids", "Menopause"]
    },
    {
      "id":8,
      "name": "Dr. Jessica Rodriguez",
      "experience": "9 years",
      "degree": "MBBS, MCh (Urology)",
      "hospitalName": "Hillside Hospital",
      "address": "1819 Willow Way, Atlanta, GA",
      "prices": "$190",
      "city": "Atlanta",
      "img": "doctor_jessica_rodriguez.jpg",
      "overview": "Dr. Rodriguez is a urologist specializing in conditions of the urinary tract and male reproductive system. She focuses on minimally invasive surgical techniques.",
      "experience": "9 years specializing in kidney stones, prostate conditions, and urinary incontinence.",
      "treatments": ["Kidney Stone Removal", "Prostate Surgery", "Cystoscopy", "Urinary Incontinence Treatment"],
      "conditions": ["Kidney Stones", "Prostate Cancer", "Urinary Tract Infections", "Erectile Dysfunction"]
    },
    {
      "id":9,
      "name": "Dr. Christopher Martinez",
      "experience": "14 years",
      "degree": "MBBS, MD(Res) (Pulmonology)",
      "hospitalName": "Valley View Clinic",
      "address": "2021 Spruce Ln, Detroit, MI",
      "prices": "$240",
      "city": "Detroit",
      "img": "doctor_christopher_martinez.jpg",
      "overview": "Dr. Martinez focuses on lung and respiratory disorders. He is dedicated to improving patients' quality of life through advanced treatments.",
      "experience": "14 years treating asthma, COPD, and lung infections.",
      "treatments": ["Bronchoscopy", "Pulmonary Function Tests", "Sleep Apnea Treatment", "Ventilator Management"],
      "conditions": ["Asthma", "COPD", "Pneumonia", "Sleep Apnea"]
    },
  
    {
      "id":10,
      "name": "Dr. Ashley Anderson",
      "experience": "6 years",
      "degree": "MBBS, DGO (Ophthalmology)",
      "hospitalName": "Lakeside Medical",
      "address": "2223 Redwood Dr, Seattle, WA",
      "prices": "$160",
      "city": "Seattle",
      "img": "doctor_ashley_anderson.jpg",
      "overview": "Dr. Anderson provides comprehensive eye care, including medical and surgical treatments. She is skilled in diagnosing and treating various eye conditions.",
      "experience": "6 years specializing in cataract surgery, glaucoma management, and retinal diseases.",
      "treatments": ["Cataract Surgery", "Glaucoma Treatment", "Retinal Laser Surgery", "Eye Exams"],
      "conditions": ["Cataracts", "Glaucoma", "Macular Degeneration", "Diabetic Retinopathy"]
    },
    {
      "id":11,
      "name": "Dr. Matthew Thomas",
      "experience": "11 years",
      "degree": "MBBS, MS (ENT)",
      "hospitalName": "Parkside Hospital",
      "address": "2425 Oakwood Ave, Phoenix, AZ",
      "prices": "$210",
      "city": "Phoenix",
      "img": "doctor_matthew_thomas.jpg",
      "overview": "Dr. Thomas specializes in ear, nose, and throat conditions. He is experienced in both medical and surgical treatments for ENT disorders.",
      "experience": "11 years specializing in sinusitis, tonsillitis, and hearing loss.",
      "treatments": ["Tonsillectomy", "Sinus Surgery", "Hearing Aids", "Ear Tube Placement"],
      "conditions": ["Sinusitis", "Tonsillitis", "Hearing Loss", "Sleep Apnea"]
    },
    {
      "id":12,
      "name": "Dr. Amanda Jackson",
      "experience": "16 years",
      "degree": "MBBS, DNB (Neurology)",
      "hospitalName": "Bayview Medical Center",
      "address": "2627 Pinecrest Rd, Denver, CO",
      "prices": "$260",
      "city": "Denver",
      "img": "doctor_amanda_jackson.jpg",
      "overview": "Dr. Jackson is a neurologist specializing in disorders of the nervous system. She provides diagnosis and treatment for a wide range of neurological conditions.",
      "experience": "16 years specializing in stroke, epilepsy, and movement disorders.",
      "treatments": ["Stroke Management", "Epilepsy Treatment", "Parkinson's Disease Care", "Headache Management"],
      "conditions": ["Stroke", "Epilepsy", "Parkinson's Disease", "Migraines"]
    },
    {
      "id":13,
      "name": "Dr. Joshua White",
      "experience": "8 years",
      "degree": "MBBS, DO (Family Medicine)",
      "hospitalName": "Ocean View Clinic",
      "address": "2829 Sycamore Ln, Portland, OR",
      "prices": "$170",
      "city": "Portland",
      "img": "doctor_joshua_white.jpg",
      "overview": "Dr. White provides comprehensive primary care for patients of all ages. He focuses on preventive medicine and chronic disease management.",
      "experience": "8 years of experience in general family medicine and preventive care.",
      "treatments": ["Annual Physicals", "Vaccinations", "Chronic Disease Management", "Acute Illness Care"],
      "conditions": ["Hypertension", "Diabetes", "Common Cold", "Flu"]
    },
    {
      "id":14,
      "name": "Dr. Nicole Harris",
      "experience": "19 years",
      "degree": "MBBS, MD (Oncology)",
      "hospitalName": "Forest Hill Hospital",
      "address": "3031 Cherry Tree Ln, Las Vegas, NV",
      "prices": "$290",
      "city": "Las Vegas",
      "img": "doctor_nicole_harris.jpg",
      "overview": "Dr. Harris is an oncologist specializing in the diagnosis and treatment of cancer. She provides comprehensive cancer care and support.",
      "experience": "19 years specializing in chemotherapy, radiation therapy, and cancer management.",
      "treatments": ["Chemotherapy", "Radiation Therapy", "Immunotherapy", "Palliative Care"],
      "conditions": ["Breast Cancer", "Lung Cancer", "Prostate Cancer", "Leukemia"]
    },
    {
      "id":15,
      "name": "Dr. Kevin Martin",
      "experience": "7 years",
      "degree": "MBBS, MRCS (General Surgery)",
      "hospitalName": "Meadowbrook Medical",
      "address": "3233 Aspen Ct, Albuquerque, NM",
      "prices": "$185",
      "city": "Albuquerque",
      "img": "doctor_kevin_martin.jpg",
      "overview": "Dr. Martin is a general surgeon specializing in a wide range of surgical procedures. He is skilled in both open and minimally invasive surgical techniques.",
      "experience": "7 years specializing in appendectomy, hernia repair, and gallbladder surgery.",
      "treatments": ["Appendectomy", "Hernia Repair", "Cholecystectomy", "Bowel Resection"],
      "conditions": ["Appendicitis", "Hernias", "Gallstones", "Bowel Obstruction"]
    },
    {
      "id":16,
      "name": "Dr. Stephanie Thompson",
      "experience": "13 years",
      "degree": "MBBS, DCH (Endocrinology)",
      "hospitalName": "Ridgeline Clinic",
      "address": "3435 Walnut St, Salt Lake City, UT",
      "prices": "$230",
      "city": "Salt Lake City",
      "img": "doctor_stephanie_thompson.jpg",
      "overview": "Dr. Thompson is an endocrinologist specializing in hormone-related disorders. She provides diagnosis and management for endocrine conditions.",
      "experience": "13 years specializing in diabetes, thyroid disorders, and hormonal imbalances.",
      "treatments": ["Insulin Therapy", "Thyroid Hormone Replacement", "Hormone Therapy", "Metabolic Management"],
      "conditions": ["Diabetes", "Thyroid Disorders", "Hormonal Imbalances", "Metabolic Disorders"]
    },
    {
      "id":17,
      "name": "Dr. Brandon Perez",
      "experience": "10 years",
      "degree": "MBBS, DA (Anesthesiology)",
      "hospitalName": "Sunset Ridge Hospital",
      "address": "3637 Birchwood Dr, Boise, ID",
      "prices": "$205",
      "city": "Boise",
      "img": "doctor_brandon_perez.jpg",
      "overview": "Dr. Perez is an anesthesiologist specializing in pain management and anesthesia for surgical procedures. He ensures patient comfort and safety.",
      "experience": "10 years specializing in general anesthesia, regional anesthesia, and pain management.",
      "treatments": ["General Anesthesia", "Regional Anesthesia", "Epidural Anesthesia", "Pain Management"],
      "conditions": ["Surgical Pain", "Chronic Pain", "Postoperative Pain", "Labor Pain"]
    },
    {
      "id":18,
      "name": "Dr. Melissa Lewis",
      "experience": "17 years",
      "degree": "MBBS, MD(Ger) (Geriatrics)",
      "hospitalName": "Sunrise Point Medical",
      "address": "3839 Hawthorne Ln, Billings, MT",
      "prices": "$270",
      "city": "Billings",
      "img": "doctor_melissa_lewis.jpg",
      "overview": "Dr. Lewis specializes in providing medical care for elderly patients. She focuses on promoting healthy aging and managing age-related conditions.",
      "experience": "17 years specializing in geriatric care, dementia management, and palliative care.",
      "treatments": ["Geriatric Assessments", "Dementia Care", "Palliative Care", "Medication Management"],
      "conditions": ["Dementia", "Alzheimer's Disease", "Parkinson's Disease", "Osteoporosis"]
    },
    {
      "id":19,
      "name": "Dr. Ryan Walker",
      "experience": "9 years",
      "degree": "MBBS, DMRD (Radiology)",
      "hospitalName": "Northwood Clinic",
      "address": "4041 Laurel Ave, Cheyenne, WY",
      "prices": "$195",
      "city": "Cheyenne",
      "img": "doctor_ryan_walker.jpg",
      "overview": "Dr. Walker is a radiologist specializing in interpreting medical images for diagnosis and treatment. He plays a crucial role in patient care.",
      "experience": "9 years specializing in diagnostic radiology, interventional radiology, and medical imaging.",
      "treatments": ["X-Ray Interpretation", "CT Scan Interpretation", "MRI Interpretation", "Ultrasound Interpretation"],
      "conditions": ["Fractures", "Tumors", "Infections", "Cardiovascular Diseases"]
    },
    {
      "id":20,
      "name": "Dr. Lauren Young",
      "experience": "12 years",
      "degree": "MBBS, MS(ENT) (Otolaryngology)",
      "hospitalName": "Southgate Hospital",
      "address": "4243 Magnolia Ct, Anchorage, AK",
      "prices": "$225",
      "city": "Anchorage",
      "img": "doctor_lauren_young.jpg",
      "overview": "Dr. Young specializes in ear, nose, and throat disorders. She provides."
    }
];
// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Create a new user
app.post("/users", (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
