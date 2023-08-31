const loadPhones = async(searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phone)
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) =>{
    // console.log(phone)

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden')
    };

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    //   cards
    phones.forEach(phone =>{
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    toggleLoadingSpinner(false);
};

// handle details
const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-detail-container');

    // modal phone details
    showDetailsContainer.innerHTML = `
    <img class="ml-15" src="${phone.image}">
    <p class="text-xl mb-2"><span class="font-bold text-xl">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p class="text-xl mb-2"><span class="font-bold text-xl">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p class="text-xl mb-2"><span class="font-bold text-xl">Chipset :</span>${phone?.mainFeatures?.chipSet}</p>
    <p class="text-xl mb-2"><span class="font-bold text-xl">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p class="text-xl mb-2"><span class="font-bold text-xl">Slug: </span>${phone?.slug}</p>
    <p class="text-xl mb-2"><span class="font-bold text-xl">Release Date: </span>${phone?.releaseDate}</p>
    <p class="text-xl"><span class="font-bold text-xl">GPS: </span>${phone?.others?.GPS}</p>
    `;

    // show the modal
    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhones(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden')
    }
};

// handle show all
const handleShowAll =() =>{
    handleSearch(true);
};

// loadPhones();