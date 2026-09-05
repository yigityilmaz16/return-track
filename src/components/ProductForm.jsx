import {useState} from 'react';

function ProductForm({ onAddProduct }) {
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
    function handleSubmit(event) {
        event.preventDefault();
        const name = formData.name.trim();
        const store = formData.store.trim();
        if(!formData.purchaseDate || formData.returnPeriodDays <= 0 || !name || !store) {
            alert("Lütfen tüm alanları doğru şekilde doldurun.");
            return;
        }
        const newProduct = {
            name: name,
            store: store,
            purchaseDate: formData.purchaseDate,
            returnPeriodDays: Number(formData.returnPeriodDays),
        };
        onAddProduct(newProduct);
        setFormData({
            name: '',
            store: '',
            purchaseDate: '',
            returnPeriodDays: '',
        });
    }

    return(
        <form className="ProductForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Ürün Adı</label>
          <input type="text" name="name" id="name" placeholder="Ürün Adı" value={formData.name} onChange={handleChange} required />
          <label htmlFor="store">Mağaza</label>
          <input type="text" name="store" id="store" placeholder="Mağaza" value={formData.store} onChange={handleChange} required />
          <label htmlFor="purchaseDate">Satın Alma Tarihi</label>
          <input type="date" name="purchaseDate" id="purchaseDate" placeholder="Satın Alma Tarihi" value={formData.purchaseDate} onChange={handleChange} required />
          <label htmlFor="returnPeriodDays">İade Süresi (gün)</label>
          <input type="number" name="returnPeriodDays" id="returnPeriodDays" placeholder="İade Süresi (gün)" min="1" value={formData.returnPeriodDays} onChange={handleChange} required />
          <button type="submit">Ürün Ekle</button>
        </form>
    )


}


export default ProductForm;
    