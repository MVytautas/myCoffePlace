using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Coffies
{
    public class Edit
    {
        public class Command: IRequest
        {
            public Guid Id { get; set; }
            public string Name {get;set;}
            public string Description { get; set; }
            public string Price { get; set; }
            public byte[] Image { get; set; }
            public DateTime? Date { get; set; }
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
                
                var coffee = await _context.Coffee.FindAsync(request.Id);

                if (coffee == null)
                    throw new Exception("Not found coffee");

                coffee.Name = request.Name ?? coffee.Name;
                coffee.Description = request.Description ?? coffee.Description;
                coffee.Price = request.Price ?? coffee.Price; 
                coffee.Date = request.Date ?? coffee.Date;
                coffee.Image = request.Image ?? coffee.Image;

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem with saving");
            }
        }
    }
}