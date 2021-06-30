class Program
    {
    //hallo
        static void Main(string[] args)
        {
            var length = 100;
            string output = null;
            for (int i = 1; i < length + 1; i++)
            {
                if(i % 3 == 0 && i % 5 == 0)
                {
                    output = "FizzBuzz";
                }
                else if(i % 3 == 0)
                {
                    output = "Fizz";
                }
                else if (i % 5 == 0)
                {
                    output = "Buzz";
                }
                else
                {
                    output =  i.ToString();
                }
                Console.WriteLine(output);
            }
        }
    }