using System;

namespace Domain
{
    public class Coffee
    {
        public Guid Id { get; set; }
        public string Name {get;set;}
        public string Description { get; set; }
        public string Price { get; set; }
        public byte[] Image { get; set; }
        
        public DateTime Date { get; set; }
    }
}


// playground
//                          Name = "Picture 3",
//                         Price = 3,
//                         Image = new byte[64]
//                          Price = 1.5M,
//                         Image = new byte[64]