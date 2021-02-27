using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Coffies
{
    public class Delete
    {
        public class Command: IRequest
                {
                  public Guid Id {get;set;}
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
                            throw new Exception("Could not find coffee");

                        _context.Remove(coffee);

                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem with saving");
                    }
                }
    }
}