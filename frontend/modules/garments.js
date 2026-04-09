/**
 * Danh sách tất cả các class trang phục và phụ kiện
 */
const CLOTHING_CLASSES = [
    "shirt", "top", "sweater", "cardigan", "jacket", "vest", "pants", 
    "shorts", "skirt", "coat", "dress", "jumpsuit", "cape", "glasses", 
    "hat", "headband", "tie", "glove", "watch", "belt", "leg warmer", 
    "tights, stockings", "sock", "shoe", "bag, wallet", "scarf", 
    "umbrella", "hood", "collar", "lapel", "epaulette", "sleeve", 
    "pocket", "neckline", "buckle", "zipper", "applique", "bead", 
    "bow", "flower", "fringe", "ribbon", "rivet", "ruffle", "sequin", "tassel"
];


function isEssentialApparel(index) {
    const target = getGarment(index)
    if (target === "unknown")
        return false
    // Nhóm Áo (Tops/Outerwear)
    const upperBody = ["shirt", "top", "sweater", "cardigan", "jacket", "vest", "coat"];
    
    // Nhóm Quần (Bottoms)
    const lowerBody = ["pants", "shorts", "skirt"];
    
    // 3. Nhóm Đồ liền thân (Full Body)
    const full_body = [
        "dress", "jumpsuit"
    ];

    // 4. Nhóm Phụ kiện (Accessories)
    const accessories = [
        "glasses", "hat", "headband", "tie", "glove", "watch", "belt", 
        "leg warmer", "tights, stockings", "sock", "shoe", 
        "bag, wallet", "scarf", "umbrella", "hood"
    ];

    // Kiểm tra xem input có nằm trong các nhóm này không
    return upperBody.includes(target) || 
           lowerBody.includes(target) || 
           full_body.includes(target) ||
           accessories.includes(target);
}

function getGarment(index) {
    if (index >= 0 && index < CLOTHING_CLASSES.length) {
        return CLOTHING_CLASSES[index];
    }
    return "unknown"; // Trả về unknown nếu index không hợp lệ
}

function drawBoundingBoxes(imageElement, boxes, classes) {
    // Tạo một thẻ canvas ảo trong bộ nhớ (không hiện lên UI)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Cài đặt kích thước canvas bằng đúng kích thước thật của ảnh gốc
    canvas.width = imageElement.naturalWidth || imageElement.width;
    canvas.height = imageElement.naturalHeight || imageElement.height;

    // Vẽ ảnh gốc lên canvas
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    // Tính toán độ dày nét vẽ và kích thước chữ tự động dựa trên độ phân giải ảnh
    const lineWidth = Math.max(3, canvas.width / 500);
    const fontSize = Math.max(16, canvas.width / 80);
    ctx.textBaseline = 'top';
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;

    // Lặp qua từng box để vẽ
    for (let i = 0; i < boxes.length; i++) {

        const [x1, y1, x2, y2] = boxes[i];
        const classIndex = classes[i];
        if (!isEssentialApparel(classIndex))
            continue;
        const label = getGarment(classIndex);
        
        const width = x2 - x1;
        const height = y2 - y1;

        // Tạo màu sắc khác nhau cho từng class (dùng HSL để dễ tạo màu sáng, nổi bật)
        // Nhân với 137.5 độ (Góc tỷ lệ vàng) để các index gần nhau có màu cách xa nhau
        const color = `hsl(${(classIndex * 137.5) % 360}, 100%, 50%)`;

        // 1. Vẽ hình chữ nhật (Bounding Box)
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.strokeRect(x1, y1, width, height);

        // 2. Vẽ nền cho Text để dễ đọc hơn (đè lên ảnh)
        const textWidth = ctx.measureText(label).width;
        const textPadding = 6;
        
        // Tính toán vị trí Y của nhãn. Nếu box sát mép trên ảnh quá, đẩy nhãn xuống dưới mép box
        const labelY = y1 > (fontSize + textPadding * 2) 
            ? y1 - fontSize - (textPadding * 2) 
            : y1;

        ctx.fillStyle = color;
        ctx.fillRect(
            x1 - (lineWidth / 2), 
            labelY, 
            textWidth + (textPadding * 2), 
            fontSize + (textPadding * 2)
        );

        // 3. Vẽ Text nhãn
        ctx.fillStyle = '#ffffff'; // Chữ màu trắng
        ctx.fillText(label, x1 + textPadding, labelY + textPadding);
    }

    // Trả về kết quả dưới dạng chuỗi Base64 (có thể gán thẳng vào src của thẻ <img>)
    return canvas.toDataURL('image/jpeg', 0.9); // Quality 90%
}

export {getGarment, isEssentialApparel, drawBoundingBoxes}