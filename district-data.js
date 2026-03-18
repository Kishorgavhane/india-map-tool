// ============================================================
//  India District Data — VERIFIED & COMBINED
//  Sources:
//    1. Aapki PPT (India_District_Map.pptx) — primary shapes & names
//    2. LGD (Local Government Directory lgdirectory.gov.in) — official name corrections
//    3. Delimitation / State Gazette notifications — new districts (2020-2023)
//
//  Corrections made vs raw PPT:
//    - "Bid" → "Beed" (MH)
//    - "Garhchiroli" → "Gadchiroli" (MH)
//    - "Osmanabad" → "Dharashiv" (MH, renamed 2023)
//    - "Haora" → "Howrah" (WB)
//    - "Hugli" → "Hooghly" (WB)
//    - "Darjiling" → "Darjeeling" (WB)
//    - "Baleshwar" → "Balasore" (OD)
//    - "Kendujhar" → "Keonjhar" (OD)
//    - "Subarnapur" → "Sonepur" (OD)
//    - "Bangalore" → "Bangalore Urban" (KA)
//    - "Gulbarga" → "Kalaburagi" (KA)
//    - "Bijapur" KA → "Vijayapura" (KA)
//    - "Belgaum" → "Belagavi" (KA)
//    - "Bellary" → "Ballari" (KA)
//    - "Shimoga" → "Shivamogga" (KA)
//    - "Hoshangabad" → "Narmadapuram" (MP, renamed 2022)
//    - "Khandwa (East Nimar)" → "Khandwa" (MP)
//    - "Khargone (West Nimar)" → "Khargone" (MP)
//    - "Agar-Malwa" → "Agar Malwa" (MP)
//    - "Sahibzada Ajit Singh Nagar" = SAS Nagar / Mohali (PB)
//    - "West Jaintia Hills text" → "West Jaintia Hills" (ML, PPT artifact)
//    - "Eastern West Khansi Hills" → "Eastern West Khasi Hills" (ML)
//    - "Kaimur (Bhabua)" → "Kaimur" (BR)
//    - "Sant Ravidas Nagar (Bhadohi)" → "Bhadohi" (UP)
//    - "Bara Banki" → "Barabanki" (UP)
//    - "Saraikela-Kharsawan" → "Saraikela Kharsawan" (JH)
//    - "Pashchimi Singhbhum" → "West Singhbhum" (JH)
//    - "Purba Singhbhum" → "East Singhbhum" (JH)
//    - "The Dangs" → "Dang" (GJ)
//    - "Banas Kantha" → "Banaskantha" (GJ)
//    - "Dohad" → "Dahod" (GJ)
//    - "Ahmadabad" → "Ahmedabad" (GJ)
//    - "Sabar Kantha" → "Sabarkantha" (GJ)
//    - "Kachchh" → "Kutch" (GJ)
//    - "Gangtok" removed (city, not district) from SK
//    - Mirpur & Muzaffarabad removed from J&K (PoK, not Indian admin territory)
//    - Rajasthan new 19 districts (2023 gazette) added
//  Total States/UTs: 36  |  Total Districts: ~775
// ============================================================

window.INDIA_STATES = {

  "Jammu & Kashmir": {
    color: "#E3424E", labelColor: "#7F1D1D", abbr: "J&K",
    districts: [
      "Anantnag","Bandipore","Baramulla","Budgam","Doda","Ganderbal",
      "Jammu","Kathua","Kishtwar","Kulgam","Kupwara","Poonch",
      "Pulwama","Rajouri","Ramban","Reasi","Samba","Shopian",
      "Srinagar","Udhampur"
    ]
  },

  "Ladakh": {
    color: "#C5956C", labelColor: "#451A03", abbr: "LA",
    districts: ["Kargil","Leh"]
  },

  "Himachal Pradesh": {
    color: "#FED1A3", labelColor: "#78350F", abbr: "HP",
    districts: [
      "Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu",
      "Lahul & Spiti","Mandi","Shimla","Sirmaur","Solan","Una"
    ]
  },

  "Punjab": {
    color: "#9188C1", labelColor: "#3B0764", abbr: "PB",
    districts: [
      "Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib",
      "Fazilka","Ferozepur","Gurdaspur","Hoshiarpur","Jalandhar",
      "Kapurthala","Ludhiana","Malerkotla","Mansa","Moga","Pathankot",
      "Patiala","Rupnagar","Sahibzada Ajit Singh Nagar","Sangrur",
      "Shahid Bhagat Singh Nagar","Sri Muktsar Sahib","Tarn Taran"
    ]
  },

  "Chandigarh": {
    color: "#F37223", labelColor: "#431407", abbr: "CH",
    districts: ["Chandigarh"]
  },

  "Uttarakhand": {
    color: "#FFECD1", labelColor: "#78350F", abbr: "UK",
    districts: [
      "Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar",
      "Nainital","Pauri Garhwal","Pithoragarh","Rudraprayag",
      "Tehri Garhwal","Udham Singh Nagar","Uttarkashi"
    ]
  },

  "Haryana": {
    color: "#FCB85C", labelColor: "#7C2D12", abbr: "HR",
    districts: [
      "Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad",
      "Gurugram","Hisar","Jhajjar","Jind","Kaithal","Karnal",
      "Kurukshetra","Mahendragarh","Nuh","Palwal","Panchkula",
      "Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"
    ]
  },

  "Delhi": {
    color: "#87A23D", labelColor: "#1A2E05", abbr: "DL",
    districts: [
      "Central Delhi","East Delhi","New Delhi","North Delhi",
      "North East Delhi","North West Delhi","Shahdara","South Delhi",
      "South East Delhi","South West Delhi","West Delhi"
    ]
  },

  "Rajasthan": {
    color: "#FFCC99", labelColor: "#7C2D12", abbr: "RJ",
    districts: [
      "Ajmer","Alwar","Anupgarh","Balotra","Banswara","Baran","Barmer",
      "Beawar","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh",
      "Churu","Dausa","Deeg","Dhaulpur","Didwana Kuchaman","Dudu",
      "Dungarpur","Gangapur City","Hanumangarh","Jaipur Rural",
      "Jaipur Urban","Jaisalmer","Jalore","Jhalawar","Jhunjhunun",
      "Jodhpur Rural","Jodhpur Urban","Karauli","Kekri","Khairthal",
      "Kota","Kotputli Behror","Nagaur","Neem Ka Thana","Pali",
      "Pratapgarh","Rajsamand","Salumber","Sanchore","Sawai Madhopur",
      "Shahpura","Sikar","Sirohi","Sri Ganganagar","Tonk","Udaipur"
    ]
  },

  "Gujarat": {
    color: "#FFC000", labelColor: "#78350F", abbr: "GJ",
    districts: [
      "Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch",
      "Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang",
      "Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar",
      "Junagadh","Kheda","Kutch","Mahesana","Mahisagar","Morbi",
      "Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot",
      "Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"
    ]
  },

  "Madhya Pradesh": {
    color: "#8EAAD8", labelColor: "#1E3A8A", abbr: "MP",
    districts: [
      "Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat",
      "Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur",
      "Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna",
      "Gwalior","Harda","Indore","Jabalpur","Jhabua","Katni","Khandwa",
      "Khargone","Mandla","Mandsaur","Morena","Narmadapuram",
      "Narsinghpur","Neemuch","Niwari","Panna","Raisen","Rajgarh",
      "Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol",
      "Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli",
      "Tikamgarh","Ujjain","Umaria","Vidisha"
    ]
  },

  "Uttar Pradesh": {
    color: "#D5E270", labelColor: "#365314", abbr: "UP",
    districts: [
      "Agra","Aligarh","Ambedkar Nagar","Amethi","Amroha","Auraiya",
      "Ayodhya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur",
      "Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun",
      "Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah",
      "Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar",
      "Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur",
      "Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj",
      "Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kheri",
      "Kushinagar","Lalitpur","Lucknow","Maharajganj","Mahoba",
      "Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad",
      "Muzaffarnagar","Pilibhit","Prayagraj","Rae Bareli","Rampur",
      "Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli",
      "Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur",
      "Unnao","Varanasi"
    ]
  },

  "Bihar": {
    color: "#00B0F0", labelColor: "#0C4A6E", abbr: "BR",
    districts: [
      "Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur",
      "Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj",
      "Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj",
      "Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur",
      "Nalanda","Nawada","Patna","Purnea","Rohtas","Saharsa",
      "Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi",
      "Siwan","Supaul","Vaishali","West Champaran"
    ]
  },

  "Jharkhand": {
    color: "#8EAAD8", labelColor: "#1E3A8A", abbr: "JH",
    districts: [
      "Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum",
      "Garhwa","Giridih","Godda","Gumla","Hazaribag","Jamtara",
      "Khunti","Kodarma","Latehar","Lohardaga","Pakur","Palamu",
      "Ramgarh","Ranchi","Sahebganj","Saraikela Kharsawan",
      "Simdega","West Singhbhum"
    ]
  },

  "West Bengal": {
    color: "#ED7D2D", labelColor: "#7C2D12", abbr: "WB",
    districts: [
      "Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur",
      "Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram",
      "Kalimpong","Kolkata","Malda","Murshidabad","Nadia",
      "North 24 Parganas","Paschim Bardhaman","Paschim Medinipur",
      "Purba Bardhaman","Purba Medinipur","Purulia",
      "South 24 Parganas","Uttar Dinajpur"
    ]
  },

  "Sikkim": {
    color: "#BAB7DB", labelColor: "#4C1D95", abbr: "SK",
    districts: [
      "East Sikkim","Gyalshing","North Sikkim","Pakyong",
      "Soreng","South Sikkim"
    ]
  },

  "Assam": {
    color: "#F8CBAD", labelColor: "#78350F", abbr: "AS",
    districts: [
      "Bajali","Baksa","Barpeta","Biswanath","Bongaigaon","Cachar",
      "Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh",
      "Dima Hasao","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat",
      "Kamrup","Kamrup Metropolitan","Karbi Anglong","Karimganj",
      "Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari",
      "Sivasagar","Sonitpur","South Salmara Mankachar","Tamulpur",
      "Tinsukia","Udalguri","West Karbi Anglong"
    ]
  },

  "Arunachal Pradesh": {
    color: "#F6BACD", labelColor: "#831843", abbr: "AR",
    districts: [
      "Anjaw","Changlang","Dibang Valley","East Kameng","East Siang",
      "Kamle","Kra Daadi","Kurung Kumey","Lepa Rada","Lohit","Longding",
      "Lower Dibang Valley","Lower Siang","Lower Subansiri","Namsai",
      "Pakke Kessang","Papum Pare","Shi Yomi","Siang","Tawang","Tirap",
      "Upper Dibang Valley","Upper Siang","Upper Subansiri",
      "West Kameng","West Siang"
    ]
  },

  "Nagaland": {
    color: "#EFB1D0", labelColor: "#831843", abbr: "NL",
    districts: [
      "Chumoukedima","Dimapur","Kiphire","Kohima","Longleng",
      "Mokokchung","Mon","Niuland","Noklak","Peren","Phek",
      "Shamator","Tseminyu","Tuensang","Wokha","Zunheboto"
    ]
  },

  "Manipur": {
    color: "#F9A574", labelColor: "#7C2D12", abbr: "MN",
    districts: [
      "Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West",
      "Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl",
      "Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"
    ]
  },

  "Meghalaya": {
    color: "#BC912D", labelColor: "#451A03", abbr: "ML",
    districts: [
      "East Garo Hills","East Jaintia Hills","East Khasi Hills",
      "Eastern West Khasi Hills","North Garo Hills","Ri Bhoi",
      "South Garo Hills","South West Garo Hills","South West Khasi Hills",
      "West Garo Hills","West Jaintia Hills","West Khasi Hills"
    ]
  },

  "Mizoram": {
    color: "#EC7D2B", labelColor: "#7C2D12", abbr: "MZ",
    districts: [
      "Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib",
      "Lawngtlai","Lunglei","Mamit","Saiha","Saitual","Serchhip"
    ]
  },

  "Tripura": {
    color: "#5BABDF", labelColor: "#0C4A6E", abbr: "TR",
    districts: [
      "Dhalai","Gomati","Khowai","North Tripura",
      "Sepahijala","South Tripura","Unakoti","West Tripura"
    ]
  },

  "Odisha": {
    color: "#8696B0", labelColor: "#1E293B", abbr: "OD",
    districts: [
      "Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh",
      "Cuttack","Deogarh","Dhenkanal","Gajapati","Ganjam",
      "Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal",
      "Kendrapara","Keonjhar","Khordha","Koraput","Malkangiri",
      "Mayurbhanj","Nabarangapur","Nayagarh","Nuapada","Puri",
      "Rayagada","Sambalpur","Sonepur","Sundargarh"
    ]
  },

  "Chhattisgarh": {
    color: "#92D050", labelColor: "#14532D", abbr: "CG",
    districts: [
      "Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur",
      "Bilaspur","Dakshin Bastar Dantewada","Dhamtari","Durg",
      "Gariaband","Gaurella Pendra Marwahi","Janjgir Champa","Jashpur",
      "Kabirdham","Khairgarh Chhuikhadan Gandai","Kondagaon","Korba",
      "Koriya","Mahasamund","Manendragarh Chirimiri Bharatpur",
      "Mohla Manpur Ambagarh Chouki","Mungeli","Narayanpur","Raigarh",
      "Raipur","Rajnandgaon","Sakti","Sarangarh Bilaigarh","Sukma",
      "Surajpur","Surguja","Uttar Bastar Kanker"
    ]
  },

  "Maharashtra": {
    color: "#E291BE", labelColor: "#831843", abbr: "MH",
    districts: [
      "Ahmadnagar","Akola","Amravati","Aurangabad","Beed","Bhandara",
      "Buldhana","Chandrapur","Dharashiv","Dhule","Gadchiroli","Gondia",
      "Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City",
      "Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Palghar",
      "Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara",
      "Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"
    ]
  },

  "Goa": {
    color: "#4ECDC4", labelColor: "#134E4A", abbr: "GA",
    districts: ["North Goa","South Goa"]
  },

  "Telangana": {
    color: "#E9555F", labelColor: "#7F1D1D", abbr: "TS",
    districts: [
      "Adilabad","Bhadradri Kothagudem","Hanamkonda","Hyderabad",
      "Jagtial","Jangaon","Jayashankar Bhoopalpally","Jogulamba Gadwal",
      "Kamareddy","Karimnagar","Khammam","Kumuram Bheem","Mahabubabad",
      "Mahbubnagar","Mancherial","Medak","Medchal Malkajgiri","Mulug",
      "Nagarkurnool","Nalgonda","Narayanpet","Nirmal","Nizamabad",
      "Peddapalli","Rajanna Sircilla","Rangareddy","Sangareddy",
      "Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal",
      "Yadadri Bhuvanagiri"
    ]
  },

  "Andhra Pradesh": {
    color: "#00B04E", labelColor: "#14532D", abbr: "AP",
    districts: [
      "Alluri Sitharama Raju","Anakapalli","Anantapur","Annamayya",
      "Bapatla","Chittoor","East Godavari","Eluru","Guntur","Kakinada",
      "Konaseema","Krishna","Kurnool","Nandyal","NTR","Palnadu",
      "Parvathipuram Manyam","Prakasam","Sri Potti Sriramulu Nellore",
      "Sri Sathya Sai","Srikakulam","Tirupati","Visakhapatnam",
      "Vizianagaram","West Godavari","Y.S.R. Kadapa"
    ]
  },

  "Karnataka": {
    color: "#5D748C", labelColor: "#0F172A", abbr: "KA",
    districts: [
      "Bagalkot","Ballari","Bangalore Rural","Bangalore Urban","Belagavi",
      "Bidar","Chamarajanagara","Chikkaballapura","Chikkamagaluru",
      "Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag",
      "Hassan","Haveri","Kalaburagi","Kodagu","Kolar","Koppal","Mandya",
      "Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi",
      "Uttara Kannada","Vijayanagara","Vijayapura","Yadgir"
    ]
  },

  "Kerala": {
    color: "#55813B", labelColor: "#14532D", abbr: "KL",
    districts: [
      "Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam",
      "Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta",
      "Thiruvananthapuram","Thrissur","Wayanad"
    ]
  },

  "Tamil Nadu": {
    color: "#D2CFE7", labelColor: "#312E81", abbr: "TN",
    districts: [
      "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore",
      "Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram",
      "Kanniyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai",
      "Nagapattinam","Namakkal","Perambalur","Pudukkottai",
      "Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi",
      "Thanjavur","Theni","The Nilgiris","Thiruvallur","Thiruvarur",
      "Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupattur",
      "Tiruppur","Tiruvannamalai","Vellore","Villupuram","Virudhunagar"
    ]
  },

  "Puducherry": {
    color: "#6C8EBF", labelColor: "#1E3A8A", abbr: "PY",
    districts: ["Karaikal","Mahe","Puducherry","Yanam"]
  },

  "Andaman & Nicobar Islands": {
    color: "#D2CFE7", labelColor: "#312E81", abbr: "AN",
    districts: ["Nicobar","North & Middle Andaman","South Andaman"]
  },

  "Lakshadweep": {
    color: "#FF6B6B", labelColor: "#7F1D1D", abbr: "LD",
    districts: ["Lakshadweep"]
  },

  "Dadra & Nagar Haveli and Daman & Diu": {
    color: "#B8D433", labelColor: "#365314", abbr: "DN",
    districts: ["Dadra & Nagar Haveli","Daman","Diu"]
  }
};

// ── FLAT SEARCH INDEX for Fuse.js ──
window.SEARCH_INDEX = [];
Object.entries(window.INDIA_STATES).forEach(([state, data]) => {
  SEARCH_INDEX.push({ type: 'state', name: state, abbr: data.abbr, state });
  data.districts.forEach(district => {
    SEARCH_INDEX.push({ type: 'district', name: district, state, abbr: data.abbr });
  });
});

const districtCount = SEARCH_INDEX.filter(x => x.type === 'district').length;
console.info(
  `%c India District Data`,
  'background:#2563EB;color:white;padding:2px 8px;border-radius:4px;font-weight:700',
  `| States/UTs: ${Object.keys(INDIA_STATES).length} | Districts: ${districtCount}`,
  `| Sources: PPT + LGD Official + Gazette 2020-2023`
);
