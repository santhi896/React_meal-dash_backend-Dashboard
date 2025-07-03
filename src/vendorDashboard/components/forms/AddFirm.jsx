


import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [FirmName, setFirmName] = useState('');
  const [Area, setArea] = useState('');
  const [Category, setCategory] = useState([]);
  const [Region, setRegion] = useState([]);
  const [Offer, setOffer] = useState('');
  const [File, setFile] = useState(null);
  const [error, setError] = useState('');

  const toggleSelect = (value, arr, setter) => {
    setter(arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value]);
  };

  const handleCategoryChange = (e) => {
    toggleSelect(e.target.value, Category, setCategory);
  };

  const handleRegionChange = (e) => {
    toggleSelect(e.target.value, Region, setRegion);
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!FirmName || !Area || Category.length === 0 || Region.length === 0) {
      alert('Please fill all required fields.');
      return;
    }

    const token = localStorage.getItem('loginToken');
    if (!token) {
      alert('Please login first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('firmName', FirmName);
      formData.append('area', Area);
      formData.append('offer', Offer);
      if (File) formData.append('image', File);
      Category.forEach((v) => formData.append('category', v));
      Region.forEach((v) => formData.append('region', v));

      const res = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          token,
        },
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        setError('Server returned invalid JSON.');
        alert('Server error');
        return;
      }

      if (!res.ok) {
        setError(data.error || 'Failed to add firm');
        alert(data.error || 'Failed to add firm');
        return;
      }

      alert('Firm added successfully!');
      setFirmName('');
      setArea('');
      setOffer('');
      setCategory([]);
      setRegion([]);
      setFile(null);

      // ✅ Save firmId and firmName to localStorage
      if (data.firm?._id) {
        localStorage.setItem('firmId', data.firm._id);
        console.log('✅ Stored firmId:', data.firm._id);
      }
      if (data.firm?.firmName) {
        localStorage.setItem('firmName', data.firm.firmName);
      }

    } catch (err) {
      console.error('Fetch/network error:', err);
      setError('Network/server error');
      alert('Network/server error');
    }
  };

  return (
    <div className="firmsection">
      <form className="tableform" onSubmit={handleSubmit}>
        <h3>Add Firm</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>Firm Name</label>
        <input
          type="text"
          name="FirmName"
          value={FirmName}
          onChange={(e) => setFirmName(e.target.value)}
        />

        <label>Area</label>
        <input
          type="text"
          name="Area"
          value={Area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="check-inp">
          <label>Category</label>
          <div className="inputcontainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={Category.includes('veg')}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={Category.includes('non-veg')}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input
          type="text"
          name="Offer"
          value={Offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <div className="check-inp">
          <label>Region</label>
          <div className="inputcontainer">
            <div className="regcheckboxcontainer">
              <label>South-Indian</label>
              <input
                type="checkbox"
                value="south-indian"
                checked={Region.includes('south-indian')}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regcheckboxcontainer">
              <label>North-Indian</label>
              <input
                type="checkbox"
                value="north-indian"
                checked={Region.includes('north-indian')}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regcheckboxcontainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                value="chineese"
                checked={Region.includes('chineese')}
                onChange={handleRegionChange}
              />
            </div>
            <div className="regcheckboxcontainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                value="bakery"
                checked={Region.includes('bakery')}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>

        <label>Image</label>
        <input type="file" onChange={handleImageUpload} />

        <div className="btnsubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
