def fibonacci_hesapla(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fibonacci = [0, 1]
    while len(fibonacci) < n:
        fibonacci.append(fibonacci[-1] + fibonacci[-2])
    
    return fibonacci

def main():
    try:
        sayi = int(input("Kaç adet Fibonacci sayısı görmek istersiniz? "))
        if sayi <= 0:
            print("Lütfen pozitif bir sayı giriniz!")
            return
            
        sonuc = fibonacci_hesapla(sayi)
        print(f"\nİlk {sayi} Fibonacci sayısı:")
        print(sonuc)
        
    except ValueError:
        print("Lütfen geçerli bir sayı giriniz!")

if __name__ == "__main__":
    main() 