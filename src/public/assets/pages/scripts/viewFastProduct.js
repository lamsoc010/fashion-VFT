function viewFastProduct(jsonProduct) {
    let product = JSON.parse(jsonProduct);
    let popUp = document.querySelector('#product-pop-up');
    
    let image = product.image.map((image, index) => {
      return ` <a href="javascript:;" class="active"><img alt="Berry Lace Dress" src="${image}"></a> `
    }).join('');

    let price = 0;
    if(product.sale == 0 ) {
      price = `<strong><span>$</span>${product.price}</strong>`
    } else {
      price = `<strong><span>$</span>${product.price - (product.sale/100)*product.price}</strong>
      <em><span>$</span>${product.price}</em>`
    }

    let size = product.storage.map((storage, index) => {
      return `<option value="${storage.size}">${storage.size}</option>`
    }).join('');
    let color = product.storage.map((storage, index) => {
      return `<option value="${storage.color}">${storage.color}</option>`
    }).join('');
    
    let sale = '';
    if(product.sale == 0) {
      sale = '';
    } else {
      sale = `<div class="sticker sticker-sale"></div>`
    }

    let html = `
        <div class="product-page product-pop-up">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-3">
              <div class="product-main-image">
                <img src="${product.image[0]}" alt="Cool green dress with red bell" class="img-responsive">
              </div>
              <div class="product-other-images">
                ${image}
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-9">
              <h2>${product.name}</h2>
              <div class="price-availability-block clearfix">
                <div class="price">
                  ${price}
                </div>
                <div class="availability">
                  Availability: <strong>In Stock</strong>
                </div>
              </div>
              <div class="description">
                <p>${product.description}.</p>
              </div>
              <div class="product-page-options">
                <div class="pull-left">
                  <label class="control-label">Size:</label>
                  <select class="form-control input-sm">
                    ${size}
                  </select>
                </div>
                <div class="pull-left">
                  <label class="control-label">Color:</label>
                  <select class="form-control input-sm">
                    ${color}
                  </select>
                </div>
              </div>
              <div class="product-page-cart">
                <div class="product-quantity">
                    <input id="product-quantity" type="text" value="1" readonly name="product-quantity" class="form-control input-sm">
                </div>
                <button class="btn btn-primary" type="submit">Add to cart</button>
                <a href="shop-item/${product._id}" class="btn btn-default">More details</a>
              </div>
            </div>
            ${sale}
          </div>
        </div>
    `;
    popUp.innerHTML = html;
  }