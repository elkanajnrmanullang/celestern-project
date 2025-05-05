namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Berita;

class Kategori extends Model
{
protected $fillable = ['nama'];

public function berita()
{
return $this->hasMany(Berita::class, 'kategori', 'nama');
}
}