


import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [ProductName, setProductName] = useState('');
  const [Price, setPrice] = useState('');
  const [Category, setCategory] = useState([]);
  const [BestSeller, setBestseller] = useState(false);
  const [Image, setImage] = useState(null);
  const [Discription, setDiscription] = useState('');
  const [error, setError] = useState('');

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === 'true';
    setBestseller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');

    const loginToken = localStorage.getItem('loginToken');
    const firmId = localStorage.getItem('firmId');

    if (!loginToken || !firmId) {
      console.error('User not authenticated');
      alert('Please log in and ensure a firm is selected.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productName', ProductName);
      formData.append('price', Price);
      formData.append('discription', Discription);
      formData.append('bestSeller', BestSeller);
      if (Image) {
        formData.append('image', Image);
      }

      Category.forEach((value) => {
        formData.append('category', value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: {
          token: loginToken
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully');
        setProductName('');
        setPrice('');
        setCategory([]);
        setBestseller(false);
        setImage(null);
        setDiscription('');
      } else {
        console.error('Server error:', data);
        setError(data.message || 'Failed to add product');
        alert(data.message || 'Failed to add product');
      }

    } catch (error) {
      console.error('Network error:', error);
      alert('Network or server error');
    }
  };

  return (
    <div className="firmsection">
      <form className="tableform" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>Product Name</label>
        <input
          type="text"
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Price</label>
        <input type="text" value={Price} onChange={(e) => setPrice(e.target.value)} />

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

        <div className="check-inp">
          <label>Best Seller</label>
          <div className="inputcontainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input
                type="radio"
                name="bestseller"
                value="true"
                checked={BestSeller === true}
                onChange={handleBestSeller}
              />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input
                type="radio"
                name="bestseller"
                value="false"
                checked={BestSeller === false}
                onChange={handleBestSeller}
              />
            </div>
          </div>
        </div>

        <label>Discription</label>
        <input
          type="text"
          value={Discription}
          onChange={(e) => setDiscription(e.target.value)}
        />

        <label>Image</label>
        <input type="file" onChange={handleImageUpload} /><br />

        <div className="btnsubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

