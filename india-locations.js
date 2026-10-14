/* ==========================================================================
   India locations — states + cities for the booking form comboboxes.
   Type freely, or pick from the dropdown. Cities offered depend on the state.
   ========================================================================== */
(function () {
  'use strict';
  if (window.IN_LOCATIONS) return;

  var PUNJAB = [
    'Ludhiana', 'Jalandhar', 'Amritsar', 'Patiala', 'Bathinda', 'Mohali', 'SAS Nagar',
    'Chandigarh', 'Hoshiarpur', 'Pathankot', 'Moga', 'Barnala', 'Sangrur', 'Fatehgarh Sahib',
    'Firozpur', 'Kapurthala', 'Rupnagar', 'SBS Nagar', 'Sri Muktsar Sahib', 'Tarn Taran',
    'Faridkot', 'Fazilka', 'Gurdaspur', 'Mansa', 'Nangal', 'Sahibzada Ajit Singh Nagar',
    'Khanna', 'Rajpura', 'Phagwara', 'Malerkotla', 'Sunam', 'Ahmedgarh', 'Raikot',
    'Jagraon', 'Mullanpur', 'Khamanon', 'Doraha', 'Sahnewal', 'Payal', 'Samrala'
  ];

  var MAJOR = [
    'Delhi', 'New Delhi', 'Mumbai', 'Navi Mumbai', 'Thane', 'Pune', 'Nagpur', 'Nashik',
    'Kolkata', 'Howrah', 'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli',
    'Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Hyderabad', 'Warangal', 'Secunderabad',
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar',
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner',
    'Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Prayagraj', 'Ghaziabad', 'Noida',
    'Gurugram', 'Faridabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur',
    'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar',
    'Raipur', 'Bhilai', 'Bilaspur', 'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro',
    'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Ranchi',
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri',
    'Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat',
    'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Nainital',
    'Shimla', 'Solan', 'Mandi', 'Dharamshala', 'Kullu', 'Manali',
    'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur',
    'Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha', 'Kannur',
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kakinada', 'Rajahmundry',
    'Panaji', 'Vasco da Gama', 'Margao', 'Mapusa',
    'Imphal', 'Shillong', 'Aizawl', 'Kohima', 'Dimapur', 'Agartala', 'Gangtok', 'Itanagar',
    'Port Blair', 'Kavaratti', 'Puducherry', 'Karaikal', 'Daman', 'Diu', 'Silvassa'
  ];

  var LOCATIONS = {
    'Punjab': PUNJAB,
    'Haryana': ['Chandigarh', 'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar',
                'Rohtak', 'Sonipat', 'Yamunanagar', 'Panchkula', 'Bhiwani', 'Sirsa', 'Jind',
                'Thanesar', 'Kaithal', 'Rewari', 'Palwal', 'Narnaul', 'Kurukshetra'],
    'Himachal Pradesh': ['Shimla', 'Solan', 'Mandi', 'Kullu', 'Manali', 'Dharamshala',
                         'Palampur', 'Bilaspur', 'Hamirpur', 'Una', 'Nahan', 'Chamba',
                         'Kufri', 'Kasauli', 'Dalhousie'],
    'Chandigarh': ['Chandigarh'],
    'Delhi': ['New Delhi', 'Delhi', 'Dwarka', 'Rohini', 'Pitampura', 'Saket', 'Karol Bagh',
              'Lajpat Nagar', 'Janakpuri', 'Mayur Vihar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Prayagraj', 'Noida',
                      'Ghaziabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur', 'Mathura',
                      'Ayodhya', 'Jhansi', 'Saharanpur', 'Firozabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Nainital', 'Rishikesh',
                    'Almora', 'Pithoragarh', 'Kashipur', 'Rudrapur'],
    'Maharashtra': ['Mumbai', 'Navi Mumbai', 'Thane', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad',
                    'Solapur', 'Kolhapur', 'Amravati', 'Ratnagiri', 'Jalgaon', 'Akola'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar',
                'Junagadh', 'Anand', 'Nadiad', 'Morbi', 'Mehsana', 'Bharuch'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar',
                  'Bhilwara', 'Sikar', 'Pali', 'Sri Ganganagar', 'Bharatpur', 'Mount Abu'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Satna',
                       'Ratlam', 'Dewas', 'Rewa', 'Katni', 'Singrauli'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur'],
    'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Ara',
              'Begusarai', 'Chhapra', 'Katihar', 'Munger'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh',
                  'Giridih', 'Ramgarh', 'Medininaga'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman',
                    'Malda', 'Kharagpur', 'Haldia', 'Berhampore'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Sambalpur', 'Berhampur',
               'Balasore', 'Bhadrak', 'Jharsuguda'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur',
              'Bongaigaon', 'Dhubri'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Baghmara', 'Cherrapunji'],
    'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching', 'Ukhrul'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Saiha'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto'],
    'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia', 'Khowai'],
    'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo', 'Jorethang'],
    'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem'],
    'Telangana': ['Hyderabad', 'Secunderabad', 'Warangal', 'Nizamabad', 'Karimnagar',
                  'Khammam', 'Ramagundam', 'Mahbubnagar', 'Siddipet', 'Suryapet'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore',
                       'Kakinada', 'Rajahmundry', 'Kurnool', 'Anantapur', 'Kadapa', 'Ongole'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Davangere',
                  'Ballari', 'Vijayapura', 'Shivamogga', 'Tumakuru', 'Udupi'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha',
               'Kannur', 'Kottayam', 'Palakkad', 'Malappuram'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli',
                   'Vellore', 'Erode', 'Thanjavur', 'Thoothukudi', 'Dindigul', 'Nagercoil'],
    'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe'],
    'Andaman and Nicobar Islands': ['Port Blair', 'Havelock', 'Diglipur', 'Rangat', 'Car Nicobar'],
    'Lakshadweep': ['Kavaratti', 'Agatti', 'Minicoy', 'Andrott', 'Amini'],
    'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Sopore',
                          'Kathua', 'Poonch'],
    'Ladakh': ['Leh', 'Kargil', 'Nubra', 'Zanskar'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Silvassa', 'Daman', 'Diu', 'Vapi', 'Naroli']
  };

  // every state, alphabetical, with the temple's home state on top
  var STATES = ['Punjab'].concat(Object.keys(LOCATIONS).filter(function (s) { return s !== 'Punjab'; }).sort());

  // flat city index so typing a known city can fill the state automatically
  var CITY_TO_STATE = {};
  Object.keys(LOCATIONS).forEach(function (st) {
    LOCATIONS[st].forEach(function (c) {
      var k = c.toLowerCase();
      if (!CITY_TO_STATE[k]) CITY_TO_STATE[k] = st;
    });
  });

  /** Options for the city dropdown: chosen state's cities first, then major cities. */
  function cityOptions(state) {
    var own = state && LOCATIONS[state] ? LOCATIONS[state] : [];
    var rest = MAJOR.filter(function (c) { return own.indexOf(c) < 0; });
    return own.concat(rest);
  }

  function stateForCity(city) {
    return CITY_TO_STATE[String(city || '').trim().toLowerCase()] || null;
  }

  window.IN_LOCATIONS = {
    states: STATES,
    citiesByState: LOCATIONS,
    majorCities: MAJOR,
    cityOptions: cityOptions,
    stateForCity: stateForCity
  };
  // populate <datalist> from an array of strings
  window.fillDatalist = function (id, values) {
    var dl = document.getElementById(id);
    if (!dl) return;
    var seen = {};
    var html = '';
    for (var i = 0; i < values.length; i++) {
      var v = String(values[i]).replace(/"/g, '&quot;');
      if (seen[v]) continue;
      seen[v] = 1;
      html += '<option value="' + v + '"></option>';
    }
    dl.innerHTML = html;
  };
})();
