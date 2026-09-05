import {useState} from 'react';

function ProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        store: '',
        purchaseDate: '',
        returnPeriodDays: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return(
        <form className="ProductForm">
          <label htmlFor="name">Ürün Adı</label>
          <input type="text" name="name" id="name" placeholder="Ürün Adı" value={formData.name} onChange={handleChange} />
          <label htmlFor="store">Mağaza</label>
          <input type="text" name="store" id="store" placeholder="Mağaza" value={formData.store} onChange={handleChange} />
          <label htmlFor="purchaseDate">Satın Alma Tarihi</label>
          <input type="date" name="purchaseDate" id="purchaseDate" placeholder="Satın Alma Tarihi" value={formData.purchaseDate} onChange={handleChange} />
          <label htmlFor="returnPeriodDays">İade Süresi (gün)</label>
          <input type="number" name="returnPeriodDays" id="returnPeriodDays" placeholder="İade Süresi (gün)" min="1" value={formData.returnPeriodDays} onChange={handleChange} />
        </form>
    )


}


export default ProductForm;
    