import {sendImageToBackend} from './modules/api_requests.js';
import { getGarment, isEssentialApparel, drawBoundingBoxes } from './modules/garments.js';

document.addEventListener('DOMContentLoaded', () => {
    // Lấy các element
    const uploadInput = document.getElementById('image-upload');
    const btnUploadTrigger = document.getElementById('btn-upload-trigger');
    const uploadArea = document.getElementById('upload-area');
    
    const actionArea = document.getElementById('action-area');
    const originalImage = document.getElementById('original-image');
    const btnProcess = document.getElementById('btn-process');
    const btnReset = document.getElementById('btn-reset');
    
    const resultArea = document.getElementById('result-area');
    const processedImage = document.getElementById('processed-image');
    const resultText = document.getElementById('result-text');
    const btnDownload = document.getElementById('btn-download');

    // Mở hộp thoại chọn file khi bấm nút
    btnUploadTrigger.addEventListener('click', () => {
        uploadInput.click();
    });

    // Xử lý khi người dùng chọn ảnh
    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Hiển thị ảnh gốc
                originalImage.src = event.target.result;
                // Đổi giao diện
                uploadArea.classList.add('hidden');
                actionArea.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        }
    });

    // Nút "Xử lý"
    btnProcess.addEventListener('click', async () => {
        let data= await sendImageToBackend(originalImage.src)
        // Nơi này sau này bạn có thể gọi API tới backend AI
        // Hiện tại: Mô phỏng việc xử lý bằng cách lấy lại ảnh gốc
        processedImage.src = drawBoundingBoxes(originalImage, data[0].boxes, data[0].classes);
        resultText.value = "Thông tin ví dụ: Ảnh đã được xử lý thành công. Độ phân giải, đặc trưng nhận diện,...";
        
        // Hiện khu vực kết quả
        resultArea.classList.remove('hidden');
        // Ẩn nút xử lý để tránh bấm nhiều lần, hoặc có thể giữ lại tùy logic
        btnProcess.classList.add('hidden'); 
    });

    // Nút "Tải ảnh khác"
    btnReset.addEventListener('click', () => {
        // Reset giao diện về ban đầu
        uploadInput.value = '';
        originalImage.src = '';
        processedImage.src = '';
        resultText.value = '';
        
        btnProcess.classList.remove('hidden');
        resultArea.classList.add('hidden');
        actionArea.classList.add('hidden');
        uploadArea.classList.remove('hidden');
    });

    // Nút "Tải xuống kết quả" (Định dạng JSON)
    btnDownload.addEventListener('click', () => {
        // Gói dữ liệu gồm text và ảnh (định dạng base64)
        const dataToSave = {
            extractedInfo: resultText.value,
            processedImageBase64: processedImage.src
        };

        const jsonString = JSON.stringify(dataToSave, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        // Tạo thẻ <a> ảo để trigger việc tải xuống
        const a = document.createElement('a');
        a.href = url;
        a.download = "ket_qua_xu_ly.json";
        document.body.appendChild(a);
        a.click();
        
        // Dọn dẹp
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});