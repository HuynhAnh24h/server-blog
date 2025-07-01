# API server Nodejs

## Lib

- CRUD.
- Using upload image to cloudinary.
- Using Google Firebase for login google.
- Using Json web token for authentication, authenticated and role for website.
- Using Mongodb for website Database.

## Running project

- npm run dev ( run project for dev enviroment)
- npm start ( start project in server)
- npm run build ( build and debugs for server api)

## Test Case 

- Test api with 

# Unitest
- Test đơn vị nhỏ nhất trong hệ thống
- Một Function riêng, không phụ thuộc vào cái gì khác

# Integration Test
- Test nhiều thành phần hoạt động cùng nhau 
- Controller gọi DB, API Enpoind trả về đúng kiểu dữ liệu 
Tổng kết dễ nhớ
Loại test	                            Test cái gì?	                    Nhanh hay chậm	                         Dùng khi nào?

✅ Unit test	                Hàm nhỏ, logic độc lập	                        Cực nhanh	                        Kiểm tra logic bên trong
🔁 Integration test	        Các module/API kết hợp với nhau	                Trung bình/chậm	                Kiểm tra hệ thống hoạt động trơn tru
