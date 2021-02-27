using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Coffies
{
    public class Create
    {
        public class Command: IRequest
        {
            public Guid Id { get; set; }
            public string Name {get;set;}
            public string Description { get; set; }
            public string Price { get; set; }
            public byte[] Image { get; set; }
            // public string Image { get; set; }
            public DateTime Date { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var coffee = new Coffee
                {
                    Id = request.Id,
                    Name = request.Name,
                    Description = request.Description,
                    Price = request.Price,
                    Image = request.Image,
                    Date = request.Date
                };

                _context.Coffee.Add(coffee);
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem with saving");
            }
        }

    }
}