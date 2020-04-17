https://www.techrepublic.com/article/how-to-enable-ssl-on-nginx/

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -sha256 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

Для телеграм сертификата обязательно -sha256

openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048                                                                              

openssl x509 -text -noout -in nginx-selfsigned.crt 
















