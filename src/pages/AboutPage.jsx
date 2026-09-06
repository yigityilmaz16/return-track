

function AboutPage(){
    return (
        <main className="about-page">
            <h1>Hakkımızda</h1>
            <p>
                Return Track, kullanıcıların satın aldıkları ürünlerin iade sürelerini takip etmelerine yardımcı olan bir uygulamadır. 
                Kullanıcılar, ürünlerini ekleyebilir, iade durumlarını güncelleyebilir ve iade süresi dolmuş ürünleri görebilirler.
            </p>
            <p>
                Bu uygulama, kullanıcıların iade sürelerini kaçırmamalarını sağlamak ve iade işlemlerini daha kolay yönetmelerine yardımcı olmak amacıyla geliştirilmiştir.
            </p>
            <p>
                Satın alma tarihi: 2023-06-01, iade süresi: 30 gün olan bir ürün için, iade süresi 2023-07-01 tarihinde sona erecektir. Kullanıcılar, bu tarihe kadar ürünlerini iade edebilirler.
            </p>
            <p>
                İade süresi: 30 gün olan bir ürün için, kullanıcılar ürünlerini 30 gün içinde iade edebilirler. Bu süre, ürünün satın alma tarihinden itibaren başlar.
            </p>
            <p>
                İade durumu: Kullanıcılar, ürünlerini iade ettiklerinde, ürünün iade durumu "İade Edildi" olarak güncellenir. Eğer kullanıcılar ürünü iade etmezlerse, ürünün iade durumu "İade Süresi doldu" olarak gösterilir.
            </p>
        </main>
    )
}

export default AboutPage